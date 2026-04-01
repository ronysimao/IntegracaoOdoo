'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

export default function DateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Se não houver data na URL, defaults para o mês atual
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const paramsDateFrom = searchParams.get('dateFrom');
    const paramsDateTo = searchParams.get('dateTo');

    if (paramsDateFrom) setDateFrom(paramsDateFrom);
    else {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      setDateFrom(startOfMonth);
    }

    if (paramsDateTo) setDateTo(paramsDateTo);
    else {
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];
      setDateTo(endOfMonth);
    }
  }, [searchParams]);

  const applyFilters = useCallback((newFrom: string, newTo: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (newFrom) current.set('dateFrom', newFrom);
    if (newTo) current.set('dateTo', newTo);

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/${query}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => {
          setDateFrom(e.target.value);
          applyFilters(e.target.value, dateTo);
        }}
        style={{
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          outline: 'none',
          cursor: 'pointer'
        }}
      />
      <span style={{ color: 'var(--text-muted)' }}>até</span>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => {
          setDateTo(e.target.value);
          applyFilters(dateFrom, e.target.value);
        }}
        style={{
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          outline: 'none',
          cursor: 'pointer'
        }}
      />
    </div>
  );
}
