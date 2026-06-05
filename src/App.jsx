import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// ============================================================
// STYLES
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #FAFAF8;
    color: #1A1A18;
    line-height: 1.6;
  }

  :root {
    --green: #1D9E75;
    --green-dark: #0F6E56;
    --green-light: #E1F5EE;
    --green-mid: #9FE1CB;
    --blue: #185FA5;
    --blue-light: #E6F1FB;
    --purple: #534AB7;
    --purple-light: #EEEDFE;
    --amber: #854F0B;
    --amber-light: #FAEEDA;
    --red: #A32D2D;
    --red-light: #FCEBEB;
    --border: rgba(0,0,0,0.08);
    --border-dark: rgba(0,0,0,0.15);
    --text: #1A1A18;
    --text-muted: #6B6B67;
    --text-light: #9B9B96;
    --bg: #FAFAF8;
    --bg-card: #FFFFFF;
    --bg-secondary: #F4F4F0;
    --radius: 10px;
    --radius-lg: 14px;
    --radius-xl: 20px;
  }

  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 56px;
    background: rgba(250,250,248,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
  }
  .nav-logo { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; cursor: pointer; color: var(--text); }
  .nav-logo span { color: var(--green); }
  .nav-links { display: flex; gap: 0.25rem; align-items: center; }
  .nav-link { font-size: 14px; color: var(--text-muted); background: none; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; }
  .nav-link:hover { background: var(--bg-secondary); color: var(--text); }
  .nav-link.active { color: var(--text); font-weight: 500; }
  .btn { display: inline-flex; align-items: center; gap: 6px; font-family: inherit; font-size: 14px; font-weight: 500; border-radius: 8px; cursor: pointer; padding: 8px 16px; border: none; transition: all 0.15s; }
  .btn-primary { background: var(--green); color: #fff; }
  .btn-primary:hover { background: var(--green-dark); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-outline { background: transparent; color: var(--text); border: 0.5px solid var(--border-dark); }
  .btn-outline:hover { background: var(--bg-secondary); }
  .btn-sm { padding: 5px 12px; font-size: 13px; }
  .btn-danger { background: var(--red-light); color: var(--red); border: none; }

  .page { min-height: calc(100vh - 56px); }
  .container { max-width: 960px; margin: 0 auto; padding: 0 2rem; }
  .section { padding: 3rem 0; }

  .hero { padding: 4rem 2rem 3rem; text-align: center; max-width: 680px; margin: 0 auto; }
  .badge-pill { display: inline-flex; align-items: center; gap: 6px; background: var(--green-light); color: var(--green-dark); font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 20px; margin-bottom: 1.5rem; }
  .hero h1 { font-size: 38px; font-weight: 500; line-height: 1.2; letter-spacing: -0.8px; margin-bottom: 1rem; color: var(--text); }
  .hero h1 em { font-style: normal; color: var(--green); }
  .hero p { font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 2rem; }
  .hero-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

  .stats-bar { display: flex; justify-content: center; gap: 3rem; padding: 1.5rem 2rem; border-top: 0.5px solid var(--border); border-bottom: 0.5px solid var(--border); background: var(--bg-card); }
  .stat-item { text-align: center; }
  .stat-num { font-size: 22px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; }
  .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  .domain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 0 auto; max-width: 960px; padding: 0 2rem; }
  .domain-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; }
  .domain-card:hover { border-color: var(--border-dark); }
  .domain-card.selected { border: 1.5px solid var(--green); }
  .domain-icon { width: 42px; height: 42px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 1rem; }
  .domain-card h3 { font-size: 15px; font-weight: 500; margin-bottom: 6px; }
  .domain-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px; }
  .tag-row { display: flex; flex-wrap: wrap; gap: 5px; }
  .tag { font-size: 11px; font-weight: 500; padding: 3px 8px; border-radius: 20px; }
  .tag-green { background: var(--green-light); color: var(--green-dark); }
  .tag-blue { background: var(--blue-light); color: var(--blue); }
  .tag-purple { background: var(--purple-light); color: var(--purple); }
  .tag-amber { background: var(--amber-light); color: var(--amber); }
  .tag-gray { background: var(--bg-secondary); color: var(--text-muted); border: 0.5px solid var(--border); }
  .domain-count { font-size: 12px; color: var(--text-muted); margin-top: 12px; }

  .sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .sec-title { font-size: 17px; font-weight: 500; letter-spacing: -0.2px; }
  .sec-link { font-size: 13px; color: var(--green); background: none; border: none; cursor: pointer; font-family: inherit; }

  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .engineer-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: border-color 0.15s; }
  .engineer-card:hover { border-color: var(--border-dark); }
  .eng-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex-shrink: 0; }
  .avatar-green { background: var(--green-light); color: var(--green-dark); }
  .avatar-blue { background: var(--blue-light); color: var(--blue); }
  .avatar-purple { background: var(--purple-light); color: var(--purple); }
  .avatar-amber { background: var(--amber-light); color: var(--amber); }
  .eng-name { font-size: 14px; font-weight: 500; }
  .eng-meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .badge-row { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px; }
  .badge { font-size: 11px; font-weight: 500; padding: 3px 8px; border-radius: 20px; }
  .badge-verified { background: var(--green-light); color: var(--green-dark); }
  .badge-open { background: #EAF3DE; color: #3B6D11; }
  .badge-domain-blue { background: var(--blue-light); color: var(--blue); }
  .badge-domain-purple { background: var(--purple-light); color: var(--purple); }
  .badge-domain-green { background: var(--green-light); color: var(--green-dark); }
  .badge-student { background: var(--amber-light); color: var(--amber); }
  .skill-row { display: flex; flex-wrap: wrap; gap: 4px; }
  .skill-chip { font-size: 11px; padding: 3px 7px; border-radius: 4px; background: var(--bg-secondary); color: var(--text-muted); border: 0.5px solid var(--border); }

  .gig-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: border-color 0.15s; }
  .gig-card:hover { border-color: var(--border-dark); }
  .gig-left { flex: 1; }
  .gig-company { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
  .gig-title { font-size: 14px; font-weight: 500; margin-bottom: 8px; }
  .gig-right { text-align: right; flex-shrink: 0; }
  .gig-budget { font-size: 15px; font-weight: 600; color: var(--text); }
  .urgency-high { background: var(--red-light); color: var(--red); font-size: 11px; padding: 3px 8px; border-radius: 20px; display: inline-block; margin-top: 4px; }
  .urgency-mid { background: var(--amber-light); color: var(--amber); font-size: 11px; padding: 3px 8px; border-radius: 20px; display: inline-block; margin-top: 4px; }
  .urgency-low { background: var(--green-light); color: var(--green-dark); font-size: 11px; padding: 3px 8px; border-radius: 20px; display: inline-block; margin-top: 4px; }

  .divider { height: 0.5px; background: var(--border); margin: 0; }

  .profile-header { background: var(--bg-card); border-bottom: 0.5px solid var(--border); padding: 2rem 0; }
  .profile-top { display: flex; align-items: flex-start; gap: 1.5rem; }
  .avatar-lg { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 600; flex-shrink: 0; }
  .profile-name { font-size: 22px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 4px; }
  .profile-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }

  .project-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 12px; }
  .project-title { font-size: 15px; font-weight: 500; margin-bottom: 6px; }
  .project-contrib { font-size: 13px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.6; }

  .form-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-xl); padding: 2rem; max-width: 520px; margin: 2rem auto; }
  .form-title { font-size: 20px; font-weight: 500; margin-bottom: 6px; letter-spacing: -0.3px; }
  .form-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 1.5rem; }
  .form-group { margin-bottom: 1rem; }
  .form-label { font-size: 13px; font-weight: 500; color: var(--text); display: block; margin-bottom: 6px; }
  .form-input { width: 100%; padding: 10px 12px; border: 0.5px solid var(--border-dark); border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--text); background: var(--bg); outline: none; transition: border-color 0.15s; }
  .form-input:focus { border-color: var(--green); }
  .form-select { width: 100%; padding: 10px 12px; border: 0.5px solid var(--border-dark); border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--text); background: var(--bg); outline: none; cursor: pointer; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .role-select { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1.25rem; }
  .role-card { border: 0.5px solid var(--border-dark); border-radius: var(--radius); padding: 1rem; cursor: pointer; text-align: center; transition: all 0.15s; }
  .role-card:hover { border-color: var(--green); }
  .role-card.selected { border: 1.5px solid var(--green); background: var(--green-light); }
  .role-card-icon { font-size: 24px; margin-bottom: 6px; }
  .role-card-title { font-size: 14px; font-weight: 500; }
  .role-card-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .form-footer { text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 1rem; }
  .form-footer button { background: none; border: none; color: var(--green); cursor: pointer; font-family: inherit; font-size: 13px; }

  .error-box { background: var(--red-light); color: var(--red); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 1rem; }
  .success-box { background: var(--green-light); color: var(--green-dark); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 1rem; }

  .verify-step { display: flex; align-items: flex-start; gap: 14px; background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 10px; }
  .step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--green-light); color: var(--green-dark); font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .step-num.done { background: var(--green); color: #fff; }
  .step-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .step-sub { font-size: 13px; color: var(--text-muted); }
  .upload-area { border: 1.5px dashed var(--border-dark); border-radius: var(--radius); padding: 1.5rem; text-align: center; cursor: pointer; transition: border-color 0.15s; margin-top: 10px; }
  .upload-area:hover { border-color: var(--green); }
  .upload-text { font-size: 13px; color: var(--text-muted); margin-top: 6px; }
  .purge-note { background: var(--green-light); border-radius: var(--radius); padding: 10px 14px; font-size: 13px; color: var(--green-dark); display: flex; align-items: center; gap: 8px; margin-top: 12px; }

  .admin-sidebar { width: 200px; flex-shrink: 0; background: var(--bg-card); border-right: 0.5px solid var(--border); min-height: calc(100vh - 56px); padding: 1.5rem 1rem; }
  .admin-layout { display: flex; }
  .admin-main { flex: 1; padding: 2rem; }
  .sidebar-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; cursor: pointer; font-size: 14px; color: var(--text-muted); margin-bottom: 2px; background: none; border: none; font-family: inherit; width: 100%; text-align: left; }
  .sidebar-item:hover { background: var(--bg-secondary); color: var(--text); }
  .sidebar-item.active { background: var(--green-light); color: var(--green-dark); font-weight: 500; }
  .queue-item { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 10px; display: flex; align-items: center; gap: 1rem; }
  .queue-info { flex: 1; }
  .queue-name { font-size: 14px; font-weight: 500; }
  .queue-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .queue-actions { display: flex; gap: 8px; }
  .btn-approve { background: var(--green); color: #fff; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: inherit; }
  .btn-reject { background: var(--red-light); color: var(--red); border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: inherit; }

  .filter-bar { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1rem 1.25rem; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 1.5rem; }
  .filter-label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
  .filter-chip { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; cursor: pointer; border: 0.5px solid var(--border-dark); background: var(--bg); color: var(--text-muted); transition: all 0.15s; }
  .filter-chip.active { background: var(--green-light); color: var(--green-dark); border-color: var(--green); }

  .msg-layout { display: grid; grid-template-columns: 280px 1fr; height: calc(100vh - 56px); }
  .msg-sidebar { border-right: 0.5px solid var(--border); overflow-y: auto; }
  .msg-header { padding: 1rem 1.25rem; border-bottom: 0.5px solid var(--border); font-weight: 500; font-size: 15px; }
  .msg-thread-item { padding: 12px 1.25rem; border-bottom: 0.5px solid var(--border); cursor: pointer; transition: background 0.1s; }
  .msg-thread-item:hover { background: var(--bg-secondary); }
  .msg-thread-item.active { background: var(--green-light); }
  .msg-thread-name { font-size: 14px; font-weight: 500; }
  .msg-thread-preview { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .msg-main { display: flex; flex-direction: column; }
  .msg-top { padding: 1rem 1.5rem; border-bottom: 0.5px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .msg-body { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .msg-bubble { max-width: 60%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.6; }
  .msg-bubble.sent { background: var(--green); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .msg-bubble.recv { background: var(--bg-card); border: 0.5px solid var(--border); align-self: flex-start; border-bottom-left-radius: 4px; }
  .msg-input-bar { padding: 1rem 1.5rem; border-top: 0.5px solid var(--border); display: flex; gap: 10px; }
  .msg-input { flex: 1; padding: 10px 14px; border: 0.5px solid var(--border-dark); border-radius: 20px; font-family: inherit; font-size: 14px; outline: none; background: var(--bg); }
  .msg-input:focus { border-color: var(--green); }

  .lb-item { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 8px; }
  .lb-rank { font-size: 18px; font-weight: 600; color: var(--text-muted); width: 32px; text-align: center; }
  .lb-rank.top { color: var(--green); }
  .lb-info { flex: 1; }
  .lb-name { font-size: 14px; font-weight: 500; }
  .lb-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .lb-score { font-size: 16px; font-weight: 600; color: var(--green); }

  .trending-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; }
  .trend-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 0.5px solid var(--border); }
  .trend-item:last-child { border-bottom: none; }
  .trend-rank { font-size: 12px; font-weight: 600; color: var(--text-muted); width: 20px; }
  .trend-name { flex: 1; font-size: 14px; font-weight: 500; }
  .trend-bar { width: 80px; height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden; }
  .trend-bar-fill { height: 100%; background: var(--green); border-radius: 3px; }
  .trend-count { font-size: 12px; color: var(--text-muted); }

  .dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 2rem; }
  .metric-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; }
  .metric-label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
  .metric-value { font-size: 26px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; }

  .tabs { display: flex; gap: 2px; margin-bottom: 1.5rem; background: var(--bg-secondary); padding: 4px; border-radius: 10px; width: fit-content; }
  .tab-btn { padding: 7px 16px; border-radius: 7px; font-size: 14px; font-family: inherit; font-weight: 500; cursor: pointer; border: none; background: transparent; color: var(--text-muted); transition: all 0.15s; }
  .tab-btn.active { background: var(--bg-card); color: var(--text); border: 0.5px solid var(--border); }

  .company-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 10px; }
  .company-logo { width: 44px; height: 44px; border-radius: var(--radius); background: var(--blue-light); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: var(--blue); }

  .page-title { font-size: 24px; font-weight: 500; letter-spacing: -0.4px; margin-bottom: 6px; }
  .page-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 2rem; }

  .vault-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .vault-card { background: var(--bg-card); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; }
  .vault-card-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
  .vault-card-sub { font-size: 12px; color: var(--text-muted); margin-bottom: 1rem; }
  .vault-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 0.5px solid var(--border); font-size: 13px; }
  .vault-item:last-child { border-bottom: none; }
  .growth-bar-wrap { margin-bottom: 10px; }
  .growth-bar-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }
  .growth-bar { height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden; }
  .growth-bar-fill { height: 100%; background: var(--green); border-radius: 3px; transition: width 0.6s; }
  .note-input { width: 100%; min-height: 80px; padding: 10px; border: 0.5px solid var(--border-dark); border-radius: 8px; font-family: inherit; font-size: 13px; color: var(--text); background: var(--bg); resize: none; outline: none; }
  .note-input:focus { border-color: var(--green); }

  .rejection-reason { font-size: 12px; color: var(--text-muted); margin-top: 8px; background: var(--bg-secondary); padding: 8px 12px; border-radius: 8px; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 200; }
  .modal-box { background: var(--bg-card); border-radius: var(--radius-xl); padding: 1.75rem; width: 400px; border: 0.5px solid var(--border); }
  .modal-title { font-size: 16px; font-weight: 500; margin-bottom: 6px; }
  .modal-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 1.25rem; }
  .rejection-option { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 0.5px solid var(--border); border-radius: var(--radius); margin-bottom: 8px; cursor: pointer; }
  .rejection-option:hover { border-color: var(--border-dark); background: var(--bg-secondary); }
  .rejection-option.selected { border-color: var(--red); background: var(--red-light); }
  .modal-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 1.25rem; }

  .footer { border-top: 0.5px solid var(--border); padding: 1.5rem 2rem; text-align: center; font-size: 13px; color: var(--text-muted); }

  .loading { display: flex; align-items: center; justify-content: center; padding: 3rem; font-size: 14px; color: var(--text-muted); }
  .spinner { width: 20px; height: 20px; border: 2px solid var(--border); border-top-color: var(--green); border-radius: 50%; animation: spin 0.8s linear infinite; margin-right: 10px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .apply-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 200; }
  .apply-box { background: var(--bg-card); border-radius: var(--radius-xl); padding: 1.75rem; width: 440px; border: 0.5px solid var(--border); }
`;

// ============================================================
// STATIC DATA (for homepage demo)
// ============================================================
const STATIC_ENGINEERS = [
  { id: 1, name: "Tariq Hassan", flag: "🇧🇩", initials: "TH", color: "green", uni: "BUET", dept: "EEE", domain: "land", skills: ["ROS2", "SLAM", "STM32"], endorsements: 34 },
  { id: 2, name: "Ahmed Raza", flag: "🇵🇰", initials: "AR", color: "amber", uni: "NUST", dept: "EEE", domain: "land", skills: ["ROS2", "Jetson", "OpenCV"], endorsements: 28 },
  { id: 3, name: "Sofia Reyes", flag: "🇲🇽", initials: "SR", color: "blue", uni: "UNAM", dept: "Aerospace", domain: "aerial", skills: ["PX4", "MAVLink", "Gazebo"], endorsements: 41 },
  { id: 4, name: "Kenji Mori", flag: "🇯🇵", initials: "KM", color: "purple", uni: "Tokyo Tech", dept: "Naval Arch", domain: "marine", skills: ["BlueROV", "ROS2", "Nav2"], endorsements: 19 },
];

const STATIC_GIGS = [
  { id: 1, company: "Boston Dynamics", domain: "land", title: "ROS2 Navigation Engineer — Humanoid Project", skills: ["ROS2", "SLAM", "MoveIt"], budget: "$3,500", urgency: "immediate" },
  { id: 2, company: "Autel Robotics", domain: "aerial", title: "PX4 Flight Controller Developer", skills: ["PX4", "MAVLink", "C++"], budget: "$2,200", urgency: "1month" },
  { id: 3, company: "Ocean Infinity", domain: "marine", title: "AUV Systems Engineer — Deep Sea Mission", skills: ["BlueROV", "ROS2", "Acoustics"], budget: "$4,800", urgency: "immediate" },
];

const REJECTION_REASONS = ["Missing required skills", "Not enough projects", "Need more experience", "Domain mismatch", "Budget mismatch"];

// ============================================================
// HELPERS
// ============================================================
function AvatarEl({ initials, color, size = "md" }) {
  const cls = size === "lg" ? "avatar-lg" : "avatar";
  return <div className={`${cls} avatar-${color}`}>{initials || "?"}</div>;
}

function VerifiedBadge() {
  return <span className="badge badge-verified">✓ Verified</span>;
}

function DomainBadge({ domain }) {
  const map = { land: ["badge-domain-purple", "Land Robotics"], aerial: ["badge-domain-blue", "Aerial"], marine: ["badge-domain-green", "Marine"] };
  const [cls, label] = map[domain] || ["badge-domain-green", domain];
  return <span className={`badge ${cls}`}>{label}</span>;
}

function UrgencyBadge({ urgency }) {
  if (urgency === "immediate") return <span className="urgency-high">🔴 Immediate</span>;
  if (urgency === "1month") return <span className="urgency-mid">🟡 1 Month</span>;
  return <span className="urgency-low">🟢 Long Term</span>;
}

function Loading() {
  return <div className="loading"><div className="spinner" />Loading...</div>;
}

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

// ============================================================
// PAGES
// ============================================================

// ---------- HOMEPAGE ----------
function HomePage({ navigate, user }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="badge-pill">⚡ Zero-fluff. Pure skill. Fully verified.</div>
        <h1>Where <em>real engineers</em><br />meet serious opportunity</h1>
        <p>The world's only verified talent platform for Land Robotics, Aerial Drones, and Marine Systems engineers.</p>
        <div className="hero-actions">
          {user
            ? <button className="btn btn-primary" onClick={() => navigate("dashboard")}>Go to dashboard</button>
            : <>
              <button className="btn btn-primary" onClick={() => navigate("register")}>Join as engineer</button>
              <button className="btn btn-outline" onClick={() => navigate("register")}>Hire talent</button>
            </>
          }
        </div>
      </div>

      <div className="stats-bar">
        {[["1,240+", "Verified engineers"], ["380+", "Verified companies"], ["94%", "Placement rate"], ["62", "Countries"]].map(([n, l]) => (
          <div className="stat-item" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>

      <div style={{ padding: "2.5rem 0" }}>
        <div style={{ textAlign: "center", fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "1.25rem" }}>Choose your domain</div>
        <div className="domain-grid">
          {[
            { id: "land", icon: "🤖", bg: "#EEEDFE", title: "Land Robotics", desc: "Humanoids, UGV, industrial arms and ground-based autonomous systems.", tags: [["ROS2", "purple"], ["SLAM", "purple"], ["MoveIt", "purple"]], count: 487 },
            { id: "aerial", icon: "🚁", bg: "#E6F1FB", title: "Aerial & Drones", desc: "UAV, quadcopters, fixed-wing and autonomous flight systems.", tags: [["PX4", "blue"], ["ArduPilot", "blue"], ["MAVLink", "blue"]], count: 412 },
            { id: "marine", icon: "⚓", bg: "#E1F5EE", title: "Marine & Submarines", desc: "AUV, ROV, underwater systems and deep-sea robotics.", tags: [["BlueROV", "green"], ["Acoustics", "green"], ["Nav2", "green"]], count: 341 },
          ].map(d => (
            <div key={d.id} className="domain-card" onClick={() => navigate("engineers")}>
              <div className="domain-icon" style={{ background: d.bg }}>{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <div className="tag-row">{d.tags.map(([t, c]) => <span key={t} className={`tag tag-${c}`}>{t}</span>)}</div>
              <div className="domain-count">{d.count} verified engineers</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="container section">
        <div className="sec-header">
          <div className="sec-title">Top verified engineers</div>
          <button className="sec-link" onClick={() => navigate("engineers")}>View all →</button>
        </div>
        <div className="grid-2">
          {STATIC_ENGINEERS.slice(0, 4).map(eng => (
            <div key={eng.id} className="engineer-card">
              <div className="eng-top">
                <AvatarEl initials={eng.initials} color={eng.color} />
                <div>
                  <div className="eng-name">{eng.name} {eng.flag}</div>
                  <div className="eng-meta">{eng.uni} · {eng.dept}</div>
                </div>
              </div>
              <div className="badge-row">
                <VerifiedBadge />
                <span className="badge badge-open">Open to work</span>
                <DomainBadge domain={eng.domain} />
              </div>
              <div className="skill-row">{eng.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="container section">
        <div className="sec-header">
          <div className="sec-title">Active gigs</div>
          <button className="sec-link" onClick={() => navigate("gigs")}>View all →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {STATIC_GIGS.map(g => (
            <div key={g.id} className="gig-card">
              <div className="gig-left">
                <div className="gig-company">{g.company} <VerifiedBadge /></div>
                <div className="gig-title">{g.title}</div>
                <div className="tag-row">{g.skills.map(s => <span key={s} className={`tag tag-${g.domain === "land" ? "purple" : g.domain === "aerial" ? "blue" : "green"}`}>{s}</span>)}</div>
              </div>
              <div className="gig-right">
                <div className="gig-budget">{g.budget}</div>
                <UrgencyBadge urgency={g.urgency} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">AeroHydroRobo — Built for engineers who build the future. Zero spam. Zero compromise.</div>
    </div>
  );
}

// ---------- AUTH ----------
function AuthPage({ navigate, setUser }) {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("engineer");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 1 fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Step 2 fields
  const [country, setCountry] = useState("Bangladesh");
  const [domain, setDomain] = useState("land");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("EEE");
  const [status, setStatus] = useState("Student");

  const handleLogin = async () => {
    setError(""); setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setUser(data.user);
    navigate("dashboard");
  };

  const handleRegisterStep1 = () => {
    if (!email || !password || !fullName) { setError("Please fill all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError("");
    setStep(2);
  };

  const handleRegisterStep2 = async () => {
    setError(""); setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) { setLoading(false); setError(signUpError.message); return; }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        role,
        domain: role === "engineer" ? domain : null,
        university: role === "engineer" ? university : null,
        country,
        verified: false,
        availability: "open",
        endorsements: 0,
      });
      if (profileError) { setLoading(false); setError(profileError.message); return; }
    }

    setLoading(false);
    setSuccess("Account created! Check your email to confirm, then verify your identity.");
    setTimeout(() => navigate("verify"), 2000);
  };

  if (isLogin) return (
    <div className="page">
      <div className="form-card">
        <div className="form-title">Welcome back</div>
        <div className="form-sub">Log in to your AeroHydroRobo account.</div>
        {error && <div className="error-box">{error}</div>}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
        <div className="form-footer">No account? <button onClick={() => { setIsLogin(false); setError(""); }}>Register</button></div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="form-card">
        {step === 1 && <>
          <div className="form-title">Create your account</div>
          <div className="form-sub">Join the world's most verified robotics talent network.</div>
          {error && <div className="error-box">{error}</div>}
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>I am a —</div>
          <div className="role-select">
            <div className={`role-card ${role === "engineer" ? "selected" : ""}`} onClick={() => setRole("engineer")}>
              <div className="role-card-icon">🛠️</div>
              <div className="role-card-title">Engineer</div>
              <div className="role-card-sub">Showcase skills, get hired</div>
            </div>
            <div className={`role-card ${role === "company" ? "selected" : ""}`} onClick={() => setRole("company")}>
              <div className="role-card-icon">🏢</div>
              <div className="role-card-title">Company</div>
              <div className="role-card-sub">Post gigs, hire talent</div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input className="form-input" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleRegisterStep1}>
            Continue →
          </button>
          <div className="form-footer">Already have an account? <button onClick={() => { setIsLogin(true); setError(""); }}>Log in</button></div>
        </>}

        {step === 2 && role === "engineer" && <>
          <div className="form-title">Your profile</div>
          <div className="form-sub">Fill in your details. No CV needed — your projects will speak.</div>
          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Country</label>
              <select className="form-select" value={country} onChange={e => setCountry(e.target.value)}>
                <option>Bangladesh</option><option>Pakistan</option><option>India</option><option>USA</option><option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Domain</label>
              <select className="form-select" value={domain} onChange={e => setDomain(e.target.value)}>
                <option value="land">Land Robotics</option>
                <option value="aerial">Aerial & Drones</option>
                <option value="marine">Marine & Submarines</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">University name</label>
            <input className="form-input" placeholder="e.g. BUET, MIT, NUST" value={university} onChange={e => setUniversity(e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-select" value={department} onChange={e => setDepartment(e.target.value)}>
                <option>EEE</option><option>CSE</option><option>Mechanical</option><option>Aerospace</option><option>Naval Architecture</option><option>Robotics</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option>Student</option><option>Fresh Graduate</option><option>Professional</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleRegisterStep2} disabled={loading}>
            {loading ? "Creating account..." : "Next: Verify identity →"}
          </button>
        </>}

        {step === 2 && role === "company" && <>
          <div className="form-title">Company details</div>
          <div className="form-sub">Tell us about your company. Verification required before posting gigs.</div>
          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}
          <div className="form-group">
            <label className="form-label">Company name</label>
            <input className="form-input" placeholder="e.g. Boston Dynamics" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Country / HQ</label>
            <select className="form-select" value={country} onChange={e => setCountry(e.target.value)}>
              <option>USA</option><option>UK</option><option>Germany</option><option>Japan</option><option>Bangladesh</option><option>Other</option>
            </select>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleRegisterStep2} disabled={loading}>
            {loading ? "Creating account..." : "Next: Verify company →"}
          </button>
        </>}
      </div>
    </div>
  );
}

// ---------- VERIFY ----------
function VerifyPage({ navigate, user }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setError("");
    setUploading(true);
    const path = `${user.id}/${f.name}`;
    const { error } = await supabase.storage
      .from("verification-docs")
      .upload(path, f, { upsert: true });
    setUploading(false);
    if (error) { setError(error.message); return; }
    setFile(f.name);
    setUploaded(true);
  };

  const handleSubmit = async () => {
    await supabase.from("profiles").update({
      verified: false
    }).eq("id", user.id);
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="page">
      <div className="form-card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <div className="form-title">Verification submitted</div>
        <div className="form-sub">Your document is under admin review. It will be permanently deleted after review.</div>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("dashboard")}>Go to dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div style={{ maxWidth: 560, margin: "2rem auto", padding: "0 2rem" }}>
        <div className="page-title">Identity verification</div>
        <div className="page-sub">One-time process. Document deleted after review.</div>

        <div className="verify-step">
          <div className="step-num done">✓</div>
          <div><div className="step-title">Account created</div><div className="step-sub">Basic info saved.</div></div>
        </div>

        <div className="verify-step">
          <div className={`step-num ${uploaded ? "done" : ""}`}>{uploaded ? "✓" : "2"}</div>
          <div style={{ flex: 1 }}>
            <div className="step-title">Upload ID document</div>
            <div className="step-sub">NID, Passport, or Student ID. JPG, PNG, PDF — max 5MB.</div>
            {error && <div className="error-box" style={{ marginTop: 8 }}>{error}</div>}
            {!uploaded && (
              <label className="upload-area" style={{ display: "block", cursor: "pointer" }}>
                <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: "none" }} onChange={handleUpload} />
                <div style={{ fontSize: 28 }}>📄</div>
                <div className="upload-text">{uploading ? "Uploading..." : "Click to upload"}</div>
              </label>
            )}
            {uploaded && <div style={{ marginTop: 10, fontSize: 13, color: "var(--green-dark)", fontWeight: 500 }}>✓ {file} uploaded</div>}
            <div className="purge-note">🔒 Permanently deleted after admin review. We never store personal ID data.</div>
          </div>
        </div>

        <div className="verify-step" style={{ opacity: uploaded ? 1 : 0.5 }}>
          <div className="step-num">3</div>
          <div><div className="step-title">Admin review</div><div className="step-sub">Usually within 24 hours.</div></div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
          disabled={!uploaded} onClick={handleSubmit}>
          Submit for review
        </button>
      </div>
    </div>
  );
}
// ---------- ENGINEER DASHBOARD ----------
function DashboardPage({ navigate, user, profile }) {
  const [tab, setTab] = useState("overview");
  const [applications, setApplications] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      const [{ data: apps }, { data: gigsData }] = await Promise.all([
        supabase.from("applications").select("*, gigs(title, budget, urgency)").eq("engineer_id", user.id),
        supabase.from("gigs").select("*").eq("active", true).limit(5),
      ]);
      setApplications(apps || []);
      setGigs(gigsData || []);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const initials = getInitials(profile?.full_name);
  const colors = ["green", "blue", "purple", "amber"];
  const color = colors[initials.charCodeAt(0) % colors.length];

  return (
    <div className="page">
      <div className="container section">
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2rem" }}>
          <AvatarEl initials={initials} color={color} size="lg" />
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.3px" }}>{profile?.full_name || user?.email}</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
              {profile?.university && `${profile.university} · `}{profile?.country}
            </div>
            <div className="badge-row" style={{ marginTop: 10 }}>
              {profile?.verified && <VerifiedBadge />}
              {!profile?.verified && <span className="badge" style={{ background: "var(--amber-light)", color: "var(--amber)" }}>⏳ Pending verification</span>}
              <span className="badge badge-open">Open to work</span>
              {profile?.domain && <DomainBadge domain={profile.domain} />}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-outline btn-sm" onClick={() => navigate("gigs")}>Browse gigs</button>
            </div>
          </div>
        </div>

        <div className="tabs">
          {["overview", "applications", "vault"].map(t => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "overview" && <>
          <div className="dash-grid">
            <div className="metric-card"><div className="metric-label">Applications sent</div><div className="metric-value">{applications.length}</div></div>
            <div className="metric-card"><div className="metric-label">Accepted</div><div className="metric-value">{applications.filter(a => a.status === "accepted").length}</div></div>
            <div className="metric-card"><div className="metric-label">Endorsements</div><div className="metric-value">{profile?.endorsements || 0}</div></div>
          </div>
          <div className="sec-header"><div className="sec-title">Recommended gigs</div><button className="sec-link" onClick={() => navigate("gigs")}>View all →</button></div>
          {loading ? <Loading /> : gigs.filter(g => !profile?.domain || g.domain === profile?.domain).slice(0, 3).map(g => (
            <div key={g.id} className="gig-card" style={{ marginBottom: 10 }} onClick={() => navigate("gigs")}>
              <div className="gig-left">
                <div className="gig-title">{g.title}</div>
                <div className="tag-row">{(g.skills || []).map(s => <span key={s} className="tag tag-purple">{s}</span>)}</div>
              </div>
              <div className="gig-right">
                <div className="gig-budget">{g.budget}</div>
                <UrgencyBadge urgency={g.urgency} />
              </div>
            </div>
          ))}
          {!loading && gigs.length === 0 && <div style={{ fontSize: 14, color: "var(--text-muted)" }}>No gigs yet. Check back soon!</div>}
        </>}

        {tab === "applications" && <ApplicationsTab applications={applications} loading={loading} />}
        {tab === "vault" && <VaultPage />}
      </div>
    </div>
  );
}

// ---------- APPLICATIONS TAB ----------
function ApplicationsTab({ applications, loading }) {
  if (loading) return <Loading />;
  if (applications.length === 0) return (
    <div style={{ fontSize: 14, color: "var(--text-muted)", padding: "2rem 0" }}>No applications yet. Apply to gigs to see them here.</div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {applications.map((a, i) => (
        <div key={i} className="company-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{a.gigs?.title || "Gig"}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
                Applied {new Date(a.applied_at).toLocaleDateString()}
              </div>
            </div>
            <span className="badge"
              style={a.status === "accepted"
                ? { background: "var(--green-light)", color: "var(--green-dark)" }
                : a.status === "rejected"
                  ? { background: "var(--red-light)", color: "var(--red)" }
                  : { background: "var(--amber-light)", color: "var(--amber)" }}>
              {a.status === "pending" ? "⏳ Pending" : a.status === "accepted" ? "✓ Accepted" : "✕ Rejected"}
            </span>
          </div>
          {a.status === "rejected" && a.rejection_reason && (
            <div className="rejection-reason">Company feedback: <strong>{a.rejection_reason}</strong></div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------- VAULT ----------
function VaultPage() {
  const [note, setNote] = useState(() => localStorage.getItem("vault_note") || "");
  const saveNote = (v) => { setNote(v); localStorage.setItem("vault_note", v); };

  return (
    <div>
      <div style={{ background: "var(--green-light)", border: "0.5px solid var(--green)", borderRadius: "var(--radius-lg)", padding: "12px 16px", marginBottom: "1.5rem", fontSize: 13, color: "var(--green-dark)" }}>
        🔒 Your vault is 100% private. Data is stored only in your browser — never on our servers.
      </div>
      <div className="vault-grid">
        <div className="vault-card">
          <div className="vault-card-title">🎯 Dream goals</div>
          <div className="vault-card-sub">Private targets (browser only)</div>
          {["Boston Dynamics — Humanoid team", "Learn Nav2 + LIDAR by August", "Get 50 endorsements"].map((g, i) => (
            <div key={i} className="vault-item"><span>{g}</span><span style={{ fontSize: 12, color: "var(--green-dark)" }}>●</span></div>
          ))}
        </div>
        <div className="vault-card">
          <div className="vault-card-title">🔗 Private links</div>
          <div className="vault-card-sub">Not visible to anyone</div>
          {["github.com/my-private-repo", "drive.google.com/my-cad-files", "notion.so/learning-notes"].map((l, i) => (
            <div key={i} className="vault-item"><span style={{ fontSize: 12, fontFamily: "DM Mono, monospace" }}>{l}</span></div>
          ))}
        </div>
        <div className="vault-card" style={{ gridColumn: "1 / -1" }}>
          <div className="vault-card-title">📔 Personal notes</div>
          <div className="vault-card-sub">Write anything. Stored locally only.</div>
          <textarea className="note-input" value={note} onChange={e => saveNote(e.target.value)} placeholder="Write your thoughts, plans, ideas..." />
        </div>
      </div>
    </div>
  );
}

// ---------- ENGINEERS LIST ----------
function EngineersPage({ navigate }) {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState("all");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let query = supabase.from("profiles").select("*").eq("role", "engineer").eq("verified", true);
      if (domain !== "all") query = query.eq("domain", domain);
      const { data } = await query;
      setEngineers(data || []);
      setLoading(false);
    };
    fetch();
  }, [domain]);

  const colors = ["green", "blue", "purple", "amber"];

  return (
    <div className="page">
      <div className="container section">
        <div className="page-title">Verified engineers</div>
        <div className="page-sub">All engineers are identity-verified. No fake profiles.</div>
        <div className="filter-bar">
          <span className="filter-label">Domain:</span>
          {["all", "land", "aerial", "marine"].map(d => (
            <button key={d} className={`filter-chip ${domain === d ? "active" : ""}`} onClick={() => setDomain(d)}>
              {d === "all" ? "All" : d === "land" ? "🤖 Land" : d === "aerial" ? "🚁 Aerial" : "⚓ Marine"}
            </button>
          ))}
        </div>
        {loading ? <Loading /> : engineers.length === 0 ? (
          <div style={{ fontSize: 14, color: "var(--text-muted)", padding: "2rem 0" }}>
            No verified engineers yet. Be the first to join and get verified!
          </div>
        ) : (
          <div className="grid-3">
            {engineers.map((eng, i) => {
              const initials = getInitials(eng.full_name);
              const color = colors[initials.charCodeAt(0) % colors.length];
              return (
                <div key={eng.id} className="engineer-card">
                  <div className="eng-top">
                    <AvatarEl initials={initials} color={color} />
                    <div>
                      <div className="eng-name">{eng.full_name}</div>
                      <div className="eng-meta">{eng.university || "—"} · {eng.country || "—"}</div>
                    </div>
                  </div>
                  <div className="badge-row">
                    <VerifiedBadge />
                    <span className="badge badge-open">Open</span>
                    {eng.domain && <DomainBadge domain={eng.domain} />}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>⭐ {eng.endorsements} endorsements</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show static preview if no real engineers yet */}
        {!loading && engineers.length === 0 && (
          <>
            <div style={{ fontSize: 13, color: "var(--text-muted)", margin: "1.5rem 0 1rem", fontStyle: "italic" }}>Preview (demo engineers):</div>
            <div className="grid-3">
              {STATIC_ENGINEERS.map(eng => (
                <div key={eng.id} className="engineer-card" style={{ opacity: 0.6 }}>
                  <div className="eng-top">
                    <AvatarEl initials={eng.initials} color={eng.color} />
                    <div>
                      <div className="eng-name">{eng.name} {eng.flag}</div>
                      <div className="eng-meta">{eng.uni} · {eng.dept}</div>
                    </div>
                  </div>
                  <div className="badge-row">
                    <VerifiedBadge />
                    <DomainBadge domain={eng.domain} />
                  </div>
                  <div className="skill-row">{eng.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- GIGS ----------
function GigsPage({ navigate, user }) {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState("all");
  const [applying, setApplying] = useState(null);
  const [applySuccess, setApplySuccess] = useState("");
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let query = supabase.from("gigs").select("*, profiles(full_name, verified)").eq("active", true);
      if (domain !== "all") query = query.eq("domain", domain);
      const { data } = await query;
      setGigs(data || []);
      setLoading(false);
    };
    fetch();
  }, [domain]);

  const handleApply = async (gig) => {
    if (!user) { navigate("register"); return; }
    setApplyError(""); setApplySuccess("");
    const { error } = await supabase.from("applications").insert({
      engineer_id: user.id,
      gig_id: gig.id,
      status: "pending",
    });
    if (error) {
      if (error.code === "23505") setApplyError("You have already applied to this gig.");
      else setApplyError(error.message);
    } else {
      setApplySuccess(`Successfully applied to: ${gig.title}`);
    }
    setApplying(null);
    setTimeout(() => { setApplySuccess(""); setApplyError(""); }, 4000);
  };

  return (
    <div className="page">
      <div className="container section">
        <div className="page-title">Active gigs</div>
        <div className="page-sub">Only verified companies can post. No fake jobs.</div>

        {applySuccess && <div className="success-box">{applySuccess}</div>}
        {applyError && <div className="error-box">{applyError}</div>}

        <div className="filter-bar">
          <span className="filter-label">Domain:</span>
          {["all", "land", "aerial", "marine"].map(d => (
            <button key={d} className={`filter-chip ${domain === d ? "active" : ""}`} onClick={() => setDomain(d)}>
              {d === "all" ? "All" : d === "land" ? "🤖 Land" : d === "aerial" ? "🚁 Aerial" : "⚓ Marine"}
            </button>
          ))}
        </div>

        {loading ? <Loading /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {gigs.length === 0 && (
              <div style={{ fontSize: 14, color: "var(--text-muted)", padding: "2rem 0" }}>
                No gigs posted yet. Companies will post here after verification.
              </div>
            )}
            {gigs.map(g => (
              <div key={g.id} className="gig-card">
                <div className="gig-left">
                  <div className="gig-company">
                    {g.profiles?.full_name || "Company"}
                    {g.profiles?.verified && <VerifiedBadge />}
                    <span style={{ marginLeft: 4 }}>{g.type}</span>
                  </div>
                  <div className="gig-title">{g.title}</div>
                  <div className="tag-row">
                    {(g.skills || []).map(s => (
                      <span key={s} className={`tag tag-${g.domain === "land" ? "purple" : g.domain === "aerial" ? "blue" : "green"}`}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="gig-right">
                  <div className="gig-budget">{g.budget}</div>
                  <UrgencyBadge urgency={g.urgency} />
                  <div style={{ marginTop: 8 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => setApplying(g)}>
                      {user ? "Apply" : "Login to Apply"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Demo gigs if none exist */}
            {gigs.length === 0 && <>
              <div style={{ fontSize: 13, color: "var(--text-muted)", margin: "1rem 0 0.5rem", fontStyle: "italic" }}>Preview (demo gigs):</div>
              {STATIC_GIGS.map(g => (
                <div key={g.id} className="gig-card" style={{ opacity: 0.6 }}>
                  <div className="gig-left">
                    <div className="gig-company">{g.company} <VerifiedBadge /></div>
                    <div className="gig-title">{g.title}</div>
                    <div className="tag-row">{g.skills.map(s => <span key={s} className={`tag tag-${g.domain === "land" ? "purple" : g.domain === "aerial" ? "blue" : "green"}`}>{s}</span>)}</div>
                  </div>
                  <div className="gig-right">
                    <div className="gig-budget">{g.budget}</div>
                    <UrgencyBadge urgency={g.urgency} />
                  </div>
                </div>
              ))}
            </>}
          </div>
        )}

        {/* Apply Confirm Modal */}
        {applying && (
          <div className="apply-modal" onClick={() => setApplying(null)}>
            <div className="apply-box" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Apply to this gig?</div>
              <div className="modal-sub" style={{ marginBottom: 16 }}>{applying.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
                Your profile will be sent to the company. They will review and respond.
              </div>
              <div className="modal-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setApplying(null)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={() => handleApply(applying)}>Confirm Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- LEADERBOARD ----------
function LeaderboardPage() {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("role", "engineer").eq("verified", true).order("endorsements", { ascending: false }).limit(20);
      setEngineers(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const colors = ["green", "blue", "purple", "amber"];

  return (
    <div className="page">
      <div className="container section">
        <div className="page-title">Leaderboard</div>
        <div className="page-sub">Most endorsed verified engineers.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
          <div>
            {loading ? <Loading /> : engineers.length === 0 ? (
              <div style={{ fontSize: 14, color: "var(--text-muted)" }}>No verified engineers yet.</div>
            ) : engineers.map((eng, i) => {
              const initials = getInitials(eng.full_name);
              const color = colors[initials.charCodeAt(0) % colors.length];
              return (
                <div key={eng.id} className="lb-item">
                  <div className={`lb-rank ${i < 3 ? "top" : ""}`}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</div>
                  <AvatarEl initials={initials} color={color} />
                  <div className="lb-info">
                    <div className="lb-name">{eng.full_name}</div>
                    <div className="lb-sub">{eng.university || eng.country} · {eng.domain && <DomainBadge domain={eng.domain} />}</div>
                  </div>
                  <div className="lb-score">⭐ {eng.endorsements}</div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="trending-card">
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 12 }}>🔥 Trending skills</div>
              {[["ROS2", 95], ["SLAM", 82], ["PX4", 74], ["Nav2", 61], ["Jetson", 55], ["BlueROV", 42]].map(([skill, pct], i) => (
                <div key={skill} className="trend-item">
                  <div className="trend-rank">#{i + 1}</div>
                  <div className="trend-name">{skill}</div>
                  <div className="trend-bar"><div className="trend-bar-fill" style={{ width: `${pct}%` }} /></div>
                  <div className="trend-count">{pct}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- ADMIN ----------
function AdminPage({ user }) {
  const [section, setSection] = useState("queue");
  const [queue, setQueue] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [docUrls, setDocUrls] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const [{ data: eng }, { data: g }] = await Promise.all([
        supabase.from("profiles").select("*").eq("role", "engineer"),
        supabase.from("gigs").select("*, profiles(full_name)"),
      ]);
      setEngineers(eng || []);
      setGigs(g || []);
      setQueue((eng || []).filter(e => !e.verified));

      // Get doc URLs for pending engineers
      for (const e of (eng || []).filter(x => !x.verified)) {
        const { data: files } = await supabase.storage
          .from("verification-docs")
          .list(e.id);
        if (files && files.length > 0) {
          const { data: urlData } = await supabase.storage
            .from("verification-docs")
            .createSignedUrl(`${e.id}/${files[0].name}`, 3600);
          if (urlData) {
            setDocUrls(prev => ({ ...prev, [e.id]: { url: urlData.signedUrl, name: files[0].name } }));
          }
        }
      }
    };
    fetchAll();
  }, []);

  const deleteDoc = async (userId) => {
    const doc = docUrls[userId];
    if (doc) {
      await supabase.storage.from("verification-docs").remove([`${userId}/${doc.name}`]);
      setDocUrls(prev => { const n = { ...prev }; delete n[userId]; return n; });
    }
  };

  const approve = async (id) => {
    await supabase.from("profiles").update({ verified: true }).eq("id", id);
    await deleteDoc(id);
    setQueue(prev => prev.filter(e => e.id !== id));
    setEngineers(prev => prev.map(e => e.id === id ? { ...e, verified: true } : e));
  };

  const reject = async (id) => {
    await deleteDoc(id);
    setQueue(prev => prev.filter(e => e.id !== id));
  };

  const colors = ["green", "blue", "purple", "amber"];

  return (
    <div className="page admin-layout">
      <div className="admin-sidebar">
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 12, padding: "0 10px" }}>ADMIN</div>
        {[["queue", "⏳", "Verify queue"], ["engineers", "🛠️", "Engineers"], ["gigs", "📋", "Gigs"]].map(([id, icon, label]) => (
          <button key={id} className={`sidebar-item ${section === id ? "active" : ""}`} onClick={() => setSection(id)}>
            <span>{icon}</span>{label}
            {id === "queue" && queue.length > 0 && <span style={{ marginLeft: "auto", background: "var(--red)", color: "#fff", borderRadius: "20px", padding: "1px 7px", fontSize: 11 }}>{queue.length}</span>}
          </button>
        ))}
      </div>
      <div className="admin-main">
        {section === "queue" && <>
          <div className="page-title">Verification queue</div>
          <div className="page-sub">Review documents. They are permanently deleted after your decision.</div>
          {queue.length === 0 && <div style={{ fontSize: 15, color: "var(--text-muted)", padding: "2rem 0" }}>✓ Queue is empty.</div>}
          {queue.map(eng => {
            const initials = getInitials(eng.full_name);
            const color = colors[initials.charCodeAt(0) % colors.length];
            const doc = docUrls[eng.id];
            return (
              <div key={eng.id} className="queue-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                  <AvatarEl initials={initials} color={color} />
                  <div className="queue-info">
                    <div className="queue-name">{eng.full_name}</div>
                    <div className="queue-sub">{eng.country} · {eng.university} · {eng.domain}</div>
                  </div>
                  <div className="queue-actions">
                    <button className="btn-approve" onClick={() => approve(eng.id)}>✓ Approve → Delete ID</button>
                    <button className="btn-reject" onClick={() => reject(eng.id)}>✕ Reject → Delete ID</button>
                  </div>
                </div>
                {doc ? (
                  <a href={doc.url} target="_blank" rel="noreferrer"
                    style={{ fontSize: 13, color: "var(--blue)", textDecoration: "underline", marginLeft: 52 }}>
                    📄 View document: {doc.name}
                  </a>
                ) : (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 52 }}>No document uploaded yet.</div>
                )}
              </div>
            );
          })}
        </>}

        {section === "engineers" && <>
          <div className="page-title">All engineers ({engineers.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {engineers.map(eng => {
              const initials = getInitials(eng.full_name);
              const color = colors[initials.charCodeAt(0) % colors.length];
              return (
                <div key={eng.id} className="queue-item">
                  <AvatarEl initials={initials} color={color} />
                  <div className="queue-info">
                    <div className="queue-name">{eng.full_name}</div>
                    <div className="queue-sub">{eng.university} · {eng.domain} · {eng.country}</div>
                  </div>
                  {eng.verified
                    ? <VerifiedBadge />
                    : <span className="badge" style={{ background: "var(--amber-light)", color: "var(--amber)" }}>⏳ Pending</span>}
                </div>
              );
            })}
          </div>
        </>}

        {section === "gigs" && <>
          <div className="page-title">All gigs ({gigs.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {gigs.map(g => (
              <div key={g.id} className="queue-item">
                <div className="queue-info">
                  <div className="queue-name">{g.title}</div>
                  <div className="queue-sub">{g.profiles?.full_name} · {g.budget} · {g.domain}</div>
                </div>
                <span className={`badge ${g.active ? "badge-open" : ""}`}
                  style={!g.active ? { background: "var(--red-light)", color: "var(--red)" } : {}}>
                  {g.active ? "Active" : "Closed"}
                </span>
              </div>
            ))}
            {gigs.length === 0 && <div style={{ fontSize: 14, color: "var(--text-muted)" }}>No gigs posted yet.</div>}
          </div>
        </>}
      </div>
    </div>
  );
}
// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
      else setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setAuthLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    setProfile(data);
    setAuthLoading(false);
  };

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate("home");
  };

  const navItems = [
    { id: "engineers", label: "Engineers" },
    { id: "gigs", label: "Gigs" },
    { id: "leaderboard", label: "Leaderboard" },
  ];

  if (authLoading) return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    </>
  );

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} user={user} />;
      case "register": return <AuthPage navigate={navigate} setUser={setUser} />;
      case "verify": return <VerifyPage navigate={navigate} user={user} />;
      case "dashboard": return user ? <DashboardPage navigate={navigate} user={user} profile={profile} /> : <AuthPage navigate={navigate} setUser={setUser} />;
      case "engineers": return <EngineersPage navigate={navigate} />;
      case "gigs": return <GigsPage navigate={navigate} user={user} />;
      case "admin": return <AdminPage user={user} />;
      case "leaderboard": return <LeaderboardPage />;
      default: return <HomePage navigate={navigate} user={user} />;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>Aero<span>Hydro</span>Robo</div>
        <div className="nav-links">
          {navItems.map(item => (
            <button key={item.id} className={`nav-link ${page === item.id ? "active" : ""}`} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
          {user && <button className="nav-link" onClick={() => navigate("dashboard")}>Dashboard</button>}
          <button className="nav-link" onClick={() => navigate("admin")}>Admin</button>
          {user
            ? <button className="btn btn-outline btn-sm" onClick={handleLogout}>Log out</button>
            : <button className="btn btn-primary btn-sm" onClick={() => navigate("register")}>Get started</button>
          }
        </div>
      </div>
      {renderPage()}
    </>
  );
} 