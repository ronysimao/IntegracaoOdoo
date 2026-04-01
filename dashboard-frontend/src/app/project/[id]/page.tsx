import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getProjectDetails(id: string) {
  try {
    const [projRes, tasksRes] = await Promise.all([
      fetch(`http://localhost:3000/odoo/projects`, { cache: 'no-store' }),
      fetch(`http://localhost:3000/odoo/tasks`, { cache: 'no-store' })
    ]);
    
    const [projects, tasks] = await Promise.all([
      projRes.ok ? projRes.json() : { data: [] },
      tasksRes.ok ? tasksRes.json() : { data: [] }
    ]);

    const project = (projects.data || []).find((p: any) => p.id.toString() === id);
    const projectTasks = (tasks.data || []).filter((t: any) => t.project_id && t.project_id[0].toString() === id);

    return { project, tasks: projectTasks };
  } catch (error) {
    return { project: null, tasks: [] };
  }
}

export default async function ProjectDetails({ params }: { params: { id: string } }) {
  const { project, tasks } = await getProjectDetails(params.id);

  if (!project) {
    return <div style={{ padding: 24, color: '#fff' }}>Projeto não encontrado.</div>;
  }

  const allocated = tasks.reduce((acc: number, t: any) => acc + (t.allocated_hours || 0), 0);
  const effective = tasks.reduce((acc: number, t: any) => acc + (t.effective_hours || 0), 0);
  const pct = allocated > 0 ? Math.min(Math.round((effective / allocated) * 100), 100) : 0;

  return (
    <div style={{ padding: 40, color: 'var(--text-primary)', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Voltar ao Dashboard
        </Link>
      </div>
      
      <h1 style={{ fontSize: 32, marginBottom: 8, color: '#fff' }}>{project.name}</h1>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, padding: 16, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
        <div>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Progresso Global</span>
          <span style={{ fontSize: 24, fontWeight: 'bold', color: pct > 90 ? '#e8538a' : '#5bc86a' }}>{pct}%</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Horas Alocadas</span>
          <span style={{ fontSize: 24 }}>{allocated.toFixed(1)}h</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Horas Gastas</span>
          <span style={{ fontSize: 24 }}>{effective.toFixed(1)}h</span>
        </div>
      </div>

      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Tarefas do Projeto</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map((task: any) => (
          <div key={task.id} style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{task.name}</h3>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
              <span>Deadline: {task.date_deadline || 'Não definido'}</span>
              <span>Alocado: {task.allocated_hours || 0}h</span>
              <span>Gasto: {task.effective_hours || 0}h</span>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Nenhuma tarefa encontrada para este projeto.</span>}
      </div>
    </div>
  );
}
