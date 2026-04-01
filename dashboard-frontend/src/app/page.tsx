import React from 'react';

const ExpandIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="cursor-pointer text-[#8a8f9e] hover:text-[#e8eaf0] transition-colors"
    style={{ width: '15px', height: '15px' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 7.414V9a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414L6 7.414zM15 6a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V7.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L16.586 6H15zM5 14a1 1 0 0 1 1 1v1.586l2.293-2.293a1 1 0 0 1 1.414 1.414L7.414 18H9a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm9.293 1.707a1 1 0 0 1 1.414-1.414L18 16.586V15a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1h-4a1 1 0 1 1 0-2h1.586l-2.293-2.293z"
      fill="currentColor"
    />
  </svg>
);

// ... [previous imports if any, keeping it raw for NextJS App Router]
import DateFilter from '../components/DateFilter';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getDashboardData(dateFrom: string, dateTo: string) {
  try {
    const [workloadRes, projectsRes, tasksRes, timesheetsRes] = await Promise.all([
      fetch(`http://localhost:3000/odoo/workload/summary?dateFrom=${dateFrom}&dateTo=${dateTo}`, { cache: 'no-store' }),
      fetch(`http://localhost:3000/odoo/projects`, { cache: 'no-store' }),
      fetch(`http://localhost:3000/odoo/tasks?dateFrom=${dateFrom}&dateTo=${dateTo}`, { cache: 'no-store' }),
      fetch(`http://localhost:3000/odoo/timesheets?limit=10`, { cache: 'no-store' }),
    ]);

    const [workload, projects, tasks, timesheets] = await Promise.all([
      workloadRes.ok ? workloadRes.json() : { data: [] },
      projectsRes.ok ? projectsRes.json() : { data: [] },
      tasksRes.ok ? tasksRes.json() : { data: [] },
      timesheetsRes.ok ? timesheetsRes.json() : { data: [] },
    ]);

    return {
      employees: workload.data || [],
      projects: projects.data || [],
      tasks: tasks.data || [],
      recentActivity: timesheets.data || [],
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { employees: [], projects: [], tasks: [], recentActivity: [] };
  }
}

export default async function Dashboard({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Configurando defaults para Mês Atual se não houver searchParams
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
  
  const dateFrom = typeof searchParams.dateFrom === 'string' ? searchParams.dateFrom : startOfMonth;
  const dateTo = typeof searchParams.dateTo === 'string' ? searchParams.dateTo : endOfMonth;

  const { employees, projects, tasks, recentActivity } = await getDashboardData(dateFrom, dateTo);
  
  // Card 2: Status Geral de Tarefas (Donut)
  let notStarted = 0;
  let inProgress = 0;
  let complete = 0;
  
  tasks.forEach((task: any) => {
    const p = task.allocated_hours || 0;
    const e = task.effective_hours || 0;
    if (e >= p && p > 0) complete++;
    else if (e > 0) inProgress++;
    else notStarted++;
  });

  const totalTasksCount = tasks.length || 0;
  const tasksRemaining = tasks.filter((t: any) => (t.effective_hours || 0) < (t.allocated_hours || 1)).length;
  
  const overdueTasksCount = tasks.filter((t: any) => {
    if (!t.date_deadline) return false;
    const deadline = new Date(t.date_deadline);
    return deadline < today && (t.effective_hours || 0) < (t.allocated_hours || 1);
  }).length;

  const totalAllocated = tasks.reduce((acc: number, t: any) => acc + (t.allocated_hours || 0), 0);
  const totalEffective = tasks.reduce((acc: number, t: any) => acc + (t.effective_hours || 0), 0);
  
  const overallProgressPct = totalAllocated > 0 ? Math.min(Math.round((totalEffective / totalAllocated) * 100), 100) : 0;
  
  // Card 6: Time Tracking (Simplificado para Ahead/Behind)
  const tasksAhead = tasks.filter((t: any) => {
     if (!t.date_deadline) return false;
     const deadline = new Date(t.date_deadline);
     const diffDays = (deadline.getTime() - today.getTime()) / (1000 * 3600 * 24);
     return diffDays > 2 && (t.effective_hours || 0) < (t.allocated_hours || 1);
  }).length;
  
  const timeAheadPct = totalTasksCount > 0 ? Math.round((tasksAhead / totalTasksCount) * 100) : 0;
  const costUsagePct = totalAllocated > 0 ? Math.round((totalEffective / totalAllocated) * 100) : 0;

  const totalTasksCountSafe = totalTasksCount;
  const circ = 2 * Math.PI * 70; // 439.82
  
  const notStartedLen = (notStarted / totalTasksCountSafe) * circ;
  const completeLen = (complete / totalTasksCountSafe) * circ;
  const inProgressLen = (inProgress / totalTasksCountSafe) * circ;
  
  const completeOffset = -notStartedLen;
  const inProgressOffset = -(notStartedLen + completeLen);

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-icon active" style={{ color: '#c0c4d0' }}>
          <svg viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="2" width="7" height="7" rx="1.5" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" />
          </svg>
        </div>
        <div className="sidebar-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2L2 9h2v9h5v-5h2v5h5V9h2L10 2z" />
          </svg>
        </div>
        <div className="sidebar-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="10" cy="10" r="7.5" />
            <path d="M10 6v4l2.5 2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="sidebar-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <circle cx="7.5" cy="7" r="2.5" />
            <path d="M2 17c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
            <circle cx="14" cy="6" r="2" />
            <path d="M17 16c0-2.5-1.5-4-3.5-4.5" />
          </svg>
        </div>
        <div className="sidebar-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="7" width="16" height="11" rx="2" />
            <path d="M7 7V5a2 2 0 014 0v2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="sidebar-spacer"></div>

        <div className="sidebar-bottom">
          <div className="sidebar-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10 9v5M10 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="avatar-pm">GP</div>
        </div>
      </aside>

      <div className="main">
        <header className="header">
          <span className="header-title">Govalle Construction</span>
          <div className="header-avatars">
            <div className="h-avatar h-av1">RC</div>
            <div className="h-avatar h-av2">GP</div>
          </div>
          <div className="header-spacer"></div>
          
          {/* Componente Cliente de Filtro de Datas */}
          <DateFilter />
          <div style={{width: 16}}></div>

          <div className="header-nav">
            <div className="nav-btn">

              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="3" y1="4" x2="13" y2="4" />
                <line x1="3" y1="8" x2="13" y2="8" />
                <line x1="3" y1="12" x2="13" y2="12" />
              </svg>
            </div>
            <div className="nav-btn">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="4" height="12" rx="1" />
                <rect x="8" y="2" width="4" height="8" rx="1" />
              </svg>
            </div>
            <div className="nav-btn">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="12" height="12" rx="1" />
                <line x1="2" y1="6" x2="14" y2="6" />
                <line x1="7" y1="2" x2="7" y2="14" />
              </svg>
            </div>
            <div className="nav-btn">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="3" width="12" height="10" rx="1" />
                <line x1="2" y1="7" x2="14" y2="7" />
                <line x1="6" y1="7" x2="6" y2="13" />
              </svg>
            </div>
            <div className="nav-btn active">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="1,12 5,7 8,10 11,5 15,8" />
              </svg>
            </div>
            <div className="nav-btn">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="3" width="12" height="11" rx="1" />
                <line x1="2" y1="7" x2="14" y2="7" />
                <line x1="5" y1="1" x2="5" y2="5" />
                <line x1="11" y1="1" x2="11" y2="5" />
              </svg>
            </div>
            <div className="nav-btn">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z" />
                <polyline points="9,2 9,6 13,6" />
              </svg>
            </div>
          </div>
        </header>

        <div className="dashboard">
          {/* 1. HEALTH (REAL ODOO API) */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Health (Odoo API)</span>
              <div className="card-actions">
                <ExpandIcon />
              </div>
            </div>
            <div className="health-stats">
              <div className="stat-item">
                <span className="stat-label">Time</span>
                <span className="stat-value">{timeAheadPct}% ahead of schedule.</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Tasks</span>
                <span className="stat-value">{tasksRemaining} tasks remaining.</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Workload</span>
                <span className="stat-value">{overdueTasksCount} tasks overdue.</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progress</span>
                <span className="stat-value">{overallProgressPct}% complete.</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Usage</span>
                <span className="stat-value">{costUsagePct}% of allocated hours.</span>
              </div>
            </div>
          </div>

          {/* 2. TASKS */}
          <div className="card tasks-card">
            <div className="card-header" style={{ width: '100%' }}>
              <span className="card-title">Tasks Status</span>
              <div className="card-actions">
                <ExpandIcon />
              </div>
            </div>
            <div className="tasks-legend">
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#7a7f90' }}></span>Not Started ({notStarted})
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#5bc86a' }}></span>Complete ({complete})
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#36c8c8' }}></span>In Progress ({inProgress})
              </span>
            </div>
            <div className="donut-wrap">
              <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified static slices for now, keeping the design intact */}
                <circle cx="90" cy="90" r="70" fill="none" stroke="#3a3f50" strokeWidth="22" />
                {notStarted > 0 && (
                  <circle
                    cx="90" cy="90" r="70" fill="none" stroke="#7a7f90" strokeWidth="22"
                    strokeDasharray={`${notStartedLen} ${circ - notStartedLen}`} strokeDashoffset={0} strokeLinecap="butt"
                  />
                )}
                {complete > 0 && (
                  <circle
                    cx="90" cy="90" r="70" fill="none" stroke="#5bc86a" strokeWidth="22"
                    strokeDasharray={`${completeLen} ${circ - completeLen}`} strokeDashoffset={completeOffset} strokeLinecap="butt"
                  />
                )}
                {inProgress > 0 && (
                  <circle
                    cx="90" cy="90" r="70" fill="none" stroke="#36c8c8" strokeWidth="22"
                    strokeDasharray={`${inProgressLen} ${circ - inProgressLen}`} strokeDashoffset={inProgressOffset} strokeLinecap="butt"
                  />
                )}
              </svg>
              <div className="donut-label top">{inProgress}</div>
              <div className="donut-label left">{complete}</div>
              <div className="donut-label right">{notStarted}</div>
            </div>
          </div>

          {/* 3. PROGRESS POR PROJETOS (REAL) */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Project Health</span>
              <div className="card-actions">
                <ExpandIcon />
              </div>
            </div>
            <div className="progress-rows">
              {projects.slice(0, 6).map((proj: any) => {
                const projectTasks = tasks.filter((t: any) => t.project_id && t.project_id[0] === proj.id);
                const allocated = projectTasks.reduce((acc: number, t: any) => acc + (t.allocated_hours || 0), 0);
                const effective = projectTasks.reduce((acc: number, t: any) => acc + (t.effective_hours || 0), 0);
                const pct = allocated > 0 ? Math.min(Math.round((effective / allocated) * 100), 100) : 0;
                const statusColor = pct > 90 ? '#e8538a' : '#5bc86a';

                return (
                  <Link href={`/project/${proj.id}`} className="prog-row" key={proj.id} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <span className="prog-label" title={proj.name}>{proj.name.length > 12 ? proj.name.substring(0, 10) + '..' : proj.name}</span>
                    <span className="prog-pct" style={{ color: statusColor }}>{pct}%</span>
                    <div className="prog-bar-track">
                      <div className="prog-bar-fill" style={{ width: `${pct}%`, background: statusColor }}></div>
                    </div>
                  </Link>
                );
              })}
              {projects.length === 0 && <span className="text-muted text-xs">Nenhum projeto ativo.</span>}
            </div>
          </div>


          {/* 4. TIME TRACKING (REAL ADERÊNCIA) */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Time Adherence</span>
              <div className="card-actions">
                <ExpandIcon />
              </div>
            </div>
            <div className="time-legend">
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#5bc86a' }}></span>Ahead
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#e8bc53' }}></span>Behind
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#53a0e8' }}></span>On Time
              </span>
            </div>
            <div className="time-bars">
              <div className="time-row">
                <div className="time-label-wrap">
                  <span className="time-label">Completion Adherence</span>
                  <span className="time-pct">{overallProgressPct}%</span>
                </div>
                <div className="time-bar-track">
                  <div className="time-bar-fill" style={{ width: `${overallProgressPct}%`, background: '#5bc86a' }}></div>
                </div>
              </div>
              <div className="time-row">
                <div className="time-label-wrap">
                  <span className="time-label">Overdue Risk</span>
                  <span className="time-pct">{totalTasksCount > 0 ? Math.round((overdueTasksCount / totalTasksCount) * 100) : 0}%</span>
                </div>
                <div className="time-bar-track">
                  <div className="time-bar-fill" style={{ width: `${totalTasksCount > 0 ? (overdueTasksCount / totalTasksCount) * 100 : 0}%`, background: '#e8538a' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ATIVIDADE RECENTE (REAL TIMESHEETS) */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Recent Activity</span>
              <div className="card-actions">
                <ExpandIcon />
              </div>
            </div>
            <div className="activity-feed" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((act: any) => (
                <Link href={`/employee/${act.employee_id ? act.employee_id[0] : ''}`} key={act.id} className="act-item hover-link" style={{ fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}>
                  <div className="avatar-pm" style={{ width: '24px', height: '24px', fontSize: '9px', flexShrink: 0 }}>
                    {act.employee_id ? act.employee_id[1][0] : '?'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-primary)' }}>
                      <strong>{act.employee_id ? act.employee_id[1].split(' ')[0] : 'Alguém'}</strong> apontou <strong>{act.unit_amount}h</strong>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      {act.name || 'Apontamento sem descrição'}
                    </div>
                  </div>
                </Link>
              ))}
              {recentActivity.length === 0 && <span className="text-muted text-xs">Nenhuma atividade recente encontrada.</span>}
            </div>
          </div>


          {/* 6. WORKLOAD (ODOO API) */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Workload (Odoo API)</span>
              <div className="card-actions">
                <ExpandIcon />
              </div>
            </div>
            <div className="workload-legend">
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#5bc86a' }}></span>Completed
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#36c8c8' }}></span>Remaining
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#e85b5b' }}></span>Overdue
              </span>
            </div>
            <div className="workload-rows" style={{ overflowY: 'auto' }}>
              {employees.slice(0, 6).map((emp: any) => {
                let empPlanned = 0;
                let empEffective = 0;
                (emp.workload || []).forEach((w: any) => {
                  empPlanned += w.plannedHours || 0;
                  empEffective += w.effectiveHours || 0;
                });
                
                // Tratar quando há effective mas não planned
                if (empEffective > empPlanned) empPlanned = empEffective;
                
                const completedPct = empPlanned > 0 ? (empEffective / empPlanned) * 100 : 0;
                const remainingPct = 100 - completedPct;
                
                const nameParts = emp.employeeName.split(' ');
                const shortName = nameParts.length > 1 ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.` : nameParts[0];

                return (
                  <Link href={`/employee/${emp.employeeId}`} className="wl-row hover-link" key={emp.employeeId} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <span className="wl-name" title={emp.employeeName}>{shortName}</span>
                    <div className="wl-bars">
                      {completedPct > 0 && <div className="wl-bar" style={{ width: `${completedPct}%`, background: '#5bc86a' }}></div>}
                      {remainingPct > 0 && <div className="wl-bar" style={{ width: `${remainingPct}%`, background: '#36c8c8' }}></div>}
                    </div>
                  </Link>
                );
              })}
              {employees.length === 0 && (
                <div style={{color:'var(--text-muted)', fontSize: 12}}>Nenhuma alocação encontrada no período.</div>
              )}
            </div>
            <div className="wl-xaxis" style={{ marginTop: 'auto', paddingTop: '12px' }}>
              <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
