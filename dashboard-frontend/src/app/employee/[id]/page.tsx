import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getEmployeeDetails(id: string) {
  try {
    const [workloadRes, timesheetsRes] = await Promise.all([
      fetch(`http://localhost:3000/odoo/workload/summary`, { cache: 'no-store' }),
      fetch(`http://localhost:3000/odoo/timesheets?limit=50`, { cache: 'no-store' })
    ]);
    
    const [workload, timesheets] = await Promise.all([
      workloadRes.ok ? workloadRes.json() : { data: [] },
      timesheetsRes.ok ? timesheetsRes.json() : { data: [] }
    ]);

    const employee = (workload.data || []).find((e: any) => e.employeeId.toString() === id);
    const employeeTimesheets = (timesheets.data || []).filter((t: any) => t.employee_id && t.employee_id[0].toString() === id);

    return { employee, timesheets: employeeTimesheets };
  } catch (error) {
    return { employee: null, timesheets: [] };
  }
}

export default async function EmployeeDetails({ params }: { params: { id: string } }) {
  const { employee, timesheets } = await getEmployeeDetails(params.id);

  if (!employee) {
    return <div style={{ padding: 24, color: '#fff' }}>Colaborador não encontrado.</div>;
  }

  let empPlanned = 0;
  let empEffective = 0;
  (employee.workload || []).forEach((w: any) => {
    empPlanned += w.plannedHours || 0;
    empEffective += w.effectiveHours || 0;
  });

  return (
    <div style={{ padding: 40, color: 'var(--text-primary)', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Voltar ao Dashboard
        </Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#615ef0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff', fontWeight: 'bold' }}>
          {employee.employeeName[0]}
        </div>
        <div>
          <h1 style={{ fontSize: 32, margin: 0, color: '#fff' }}>{employee.employeeName}</h1>
          <span style={{ color: 'var(--text-muted)' }}>Carga de Trabalho Atual</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, padding: 16, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
        <div>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Horas Planejadas Globais</span>
          <span style={{ fontSize: 24 }}>{empPlanned.toFixed(1)}h</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Horas Executadas Globais</span>
          <span style={{ fontSize: 24 }}>{empEffective.toFixed(1)}h</span>
        </div>
      </div>

      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Atividada Recente (Timesheets)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {timesheets.map((ts: any) => (
          <div key={ts.id} style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0, fontSize: 14, color: '#fff' }}>{ts.name || 'Apontamento sem descrição'}</h3>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
              <span>Projeto: {ts.project_id ? ts.project_id[1] : 'N/A'}</span>
              <span>Tempo: <strong>{ts.unit_amount}h</strong></span>
            </div>
          </div>
        ))}
        {timesheets.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Nenhum apontamento recente encontrado para este colaborador.</span>}
      </div>
    </div>
  );
}
