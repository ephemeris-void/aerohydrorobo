import { useState, useEffect } from "react";

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

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 56px;
    background: rgba(250,250,248,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
  }
  .nav-logo {
    font-size: 16px; font-weight: 600; letter-spacing: -0.3px; cursor: pointer;
    color: var(--text);
  }
  .nav-logo span { color: var(--green); }
  .nav-links { display: flex; gap: 0.25rem; align-items: center; }
  .nav-link {
    font-size: 14px; color: var(--text-muted); background: none; border: none;
    padding: 6px 12px; border-radius: 8px; cursor: pointer; font-family: inherit;
  }
  .nav-link:hover { background: var(--bg-secondary); color: var(--text); }
  .nav-link.active { color: var(--text); font-weight: 500; }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: inherit; font-size: 14px; font-weight: 500;
    border-radius: 8px; cursor: pointer; padding: 8px 16px;
    border: none; transition: all 0.15s;
  }
  .btn-primary { background: var(--green); color: #fff; }
  .btn-primary:hover { background: var(--green-dark); }
  .btn-outline {
    background: transparent; color: var(--text);
    border: 0.5px solid var(--border-dark);
  }
  .btn-outline:hover { background: var(--bg-secondary); }
  .btn-sm { padding: 5px 12px; font-size: 13px; }

  /* PAGE WRAPPER */
  .page { min-height: calc(100vh - 56px); }
  .container { max-width: 960px; margin: 0 auto; padding: 0 2rem; }
  .section { padding: 3rem 0; }
  .section-sm { padding: 1.5rem 0; }

  /* HERO */
  .hero {
    padding: 4rem 2rem 3rem;
    text-align: center; max-width: 680px; margin: 0 auto;
  }
  .badge-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--green-light); color: var(--green-dark);
    font-size: 12px; font-weight: 500; padding: 4px 12px;
    border-radius: 20px; margin-bottom: 1.5rem;
  }
  .hero h1 {
    font-size: 38px; font-weight: 500; line-height: 1.2;
    letter-spacing: -0.8px; margin-bottom: 1rem; color: var(--text);
  }
  .hero h1 em { font-style: normal; color: var(--green); }
  .hero p {
    font-size: 16px; color: var(--text-muted); line-height: 1.7;
    margin-bottom: 2rem;
  }
  .hero-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

  /* STATS BAR */
  .stats-bar {
    display: flex; justify-content: center; gap: 3rem;
    padding: 1.5rem 2rem;
    border-top: 0.5px solid var(--border);
    border-bottom: 0.5px solid var(--border);
    background: var(--bg-card);
  }
  .stat-item { text-align: center; }
  .stat-num { font-size: 22px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; }
  .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  /* DOMAIN CARDS */
  .domain-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
    margin: 0 auto; max-width: 960px; padding: 0 2rem;
  }
  .domain-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.5rem; cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .domain-card:hover { border-color: var(--border-dark); }
  .domain-card.selected { border: 1.5px solid var(--green); }
  .domain-icon {
    width: 42px; height: 42px; border-radius: var(--radius);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 1rem;
  }
  .domain-card h3 { font-size: 15px; font-weight: 500; margin-bottom: 6px; }
  .domain-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px; }
  .tag-row { display: flex; flex-wrap: wrap; gap: 5px; }
  .tag {
    font-size: 11px; font-weight: 500; padding: 3px 8px;
    border-radius: 20px;
  }
  .tag-green { background: var(--green-light); color: var(--green-dark); }
  .tag-blue { background: var(--blue-light); color: var(--blue); }
  .tag-purple { background: var(--purple-light); color: var(--purple); }
  .tag-amber { background: var(--amber-light); color: var(--amber); }
  .tag-gray { background: var(--bg-secondary); color: var(--text-muted); border: 0.5px solid var(--border); }
  .domain-count { font-size: 12px; color: var(--text-muted); margin-top: 12px; }

  /* SECTION HEADER */
  .sec-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .sec-title { font-size: 17px; font-weight: 500; letter-spacing: -0.2px; }
  .sec-link { font-size: 13px; color: var(--green); background: none; border: none; cursor: pointer; font-family: inherit; }

  /* ENGINEER CARDS */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .engineer-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem;
    cursor: pointer; transition: border-color 0.15s;
  }
  .engineer-card:hover { border-color: var(--border-dark); }
  .eng-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 600; flex-shrink: 0;
  }
  .avatar-green { background: var(--green-light); color: var(--green-dark); }
  .avatar-blue { background: var(--blue-light); color: var(--blue); }
  .avatar-purple { background: var(--purple-light); color: var(--purple); }
  .avatar-amber { background: var(--amber-light); color: var(--amber); }
  .eng-name { font-size: 14px; font-weight: 500; }
  .eng-meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .badge-row { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px; }
  .badge {
    font-size: 11px; font-weight: 500; padding: 3px 8px; border-radius: 20px;
  }
  .badge-verified { background: var(--green-light); color: var(--green-dark); }
  .badge-open { background: #EAF3DE; color: #3B6D11; }
  .badge-domain-blue { background: var(--blue-light); color: var(--blue); }
  .badge-domain-purple { background: var(--purple-light); color: var(--purple); }
  .badge-domain-green { background: var(--green-light); color: var(--green-dark); }
  .badge-student { background: var(--amber-light); color: var(--amber); }
  .skill-row { display: flex; flex-wrap: wrap; gap: 4px; }
  .skill-chip {
    font-size: 11px; padding: 3px 7px; border-radius: 4px;
    background: var(--bg-secondary); color: var(--text-muted);
    border: 0.5px solid var(--border);
  }

  /* GIG CARDS */
  .gig-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem;
    display: flex; align-items: center; gap: 1rem;
    cursor: pointer; transition: border-color 0.15s;
  }
  .gig-card:hover { border-color: var(--border-dark); }
  .gig-left { flex: 1; }
  .gig-company { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
  .gig-title { font-size: 14px; font-weight: 500; margin-bottom: 8px; }
  .gig-right { text-align: right; flex-shrink: 0; }
  .gig-budget { font-size: 15px; font-weight: 600; color: var(--text); }
  .urgency-high { background: var(--red-light); color: var(--red); font-size: 11px; padding: 3px 8px; border-radius: 20px; display: inline-block; margin-top: 4px; }
  .urgency-mid { background: var(--amber-light); color: var(--amber); font-size: 11px; padding: 3px 8px; border-radius: 20px; display: inline-block; margin-top: 4px; }
  .urgency-low { background: var(--green-light); color: var(--green-dark); font-size: 11px; padding: 3px 8px; border-radius: 20px; display: inline-block; margin-top: 4px; }

  /* DIVIDER */
  .divider { height: 0.5px; background: var(--border); margin: 0; }

  /* PROFILE PAGE */
  .profile-header {
    background: var(--bg-card); border-bottom: 0.5px solid var(--border);
    padding: 2rem 0;
  }
  .profile-top { display: flex; align-items: flex-start; gap: 1.5rem; }
  .avatar-lg {
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; font-weight: 600; flex-shrink: 0;
  }
  .profile-name { font-size: 22px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 4px; }
  .profile-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }
  .profile-actions { display: flex; gap: 8px; margin-top: 1rem; }

  .project-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 12px;
  }
  .project-title { font-size: 15px; font-weight: 500; margin-bottom: 6px; }
  .project-contrib { font-size: 13px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.6; }
  .project-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .project-links { display: flex; gap: 8px; }
  .link-btn {
    font-size: 12px; font-weight: 500; padding: 4px 10px;
    border-radius: 6px; border: 0.5px solid var(--border-dark);
    background: transparent; color: var(--text); cursor: pointer;
    font-family: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
  }
  .link-btn:hover { background: var(--bg-secondary); }

  /* FORM */
  .form-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-xl); padding: 2rem;
    max-width: 520px; margin: 2rem auto;
  }
  .form-title { font-size: 20px; font-weight: 500; margin-bottom: 6px; letter-spacing: -0.3px; }
  .form-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 1.5rem; }
  .form-group { margin-bottom: 1rem; }
  .form-label { font-size: 13px; font-weight: 500; color: var(--text); display: block; margin-bottom: 6px; }
  .form-input {
    width: 100%; padding: 10px 12px; border: 0.5px solid var(--border-dark);
    border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--text);
    background: var(--bg); outline: none; transition: border-color 0.15s;
  }
  .form-input:focus { border-color: var(--green); }
  .form-select {
    width: 100%; padding: 10px 12px; border: 0.5px solid var(--border-dark);
    border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--text);
    background: var(--bg); outline: none; cursor: pointer;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .role-select { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1.25rem; }
  .role-card {
    border: 0.5px solid var(--border-dark); border-radius: var(--radius);
    padding: 1rem; cursor: pointer; text-align: center; transition: all 0.15s;
  }
  .role-card:hover { border-color: var(--green); }
  .role-card.selected { border: 1.5px solid var(--green); background: var(--green-light); }
  .role-card-icon { font-size: 24px; margin-bottom: 6px; }
  .role-card-title { font-size: 14px; font-weight: 500; }
  .role-card-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .form-divider { text-align: center; font-size: 13px; color: var(--text-muted); margin: 1rem 0; }
  .form-footer { text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 1rem; }
  .form-footer button { background: none; border: none; color: var(--green); cursor: pointer; font-family: inherit; font-size: 13px; }

  /* VERIFY */
  .verify-step {
    display: flex; align-items: flex-start; gap: 14px;
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 10px;
  }
  .step-num {
    width: 28px; height: 28px; border-radius: 50%; background: var(--green-light);
    color: var(--green-dark); font-size: 13px; font-weight: 600;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .step-num.done { background: var(--green); color: #fff; }
  .step-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .step-sub { font-size: 13px; color: var(--text-muted); }
  .upload-area {
    border: 1.5px dashed var(--border-dark); border-radius: var(--radius);
    padding: 1.5rem; text-align: center; cursor: pointer;
    transition: border-color 0.15s; margin-top: 10px;
  }
  .upload-area:hover { border-color: var(--green); }
  .upload-text { font-size: 13px; color: var(--text-muted); margin-top: 6px; }
  .purge-note {
    background: var(--green-light); border-radius: var(--radius);
    padding: 10px 14px; font-size: 13px; color: var(--green-dark);
    display: flex; align-items: center; gap: 8px; margin-top: 12px;
  }

  /* ADMIN PANEL */
  .admin-sidebar {
    width: 200px; flex-shrink: 0; background: var(--bg-card);
    border-right: 0.5px solid var(--border); min-height: calc(100vh - 56px);
    padding: 1.5rem 1rem;
  }
  .admin-layout { display: flex; }
  .admin-main { flex: 1; padding: 2rem; }
  .sidebar-item {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px; border-radius: 8px; cursor: pointer;
    font-size: 14px; color: var(--text-muted); margin-bottom: 2px;
    background: none; border: none; font-family: inherit; width: 100%; text-align: left;
  }
  .sidebar-item:hover { background: var(--bg-secondary); color: var(--text); }
  .sidebar-item.active { background: var(--green-light); color: var(--green-dark); font-weight: 500; }
  .queue-item {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 10px;
    display: flex; align-items: center; gap: 1rem;
  }
  .queue-info { flex: 1; }
  .queue-name { font-size: 14px; font-weight: 500; }
  .queue-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .queue-actions { display: flex; gap: 8px; }
  .btn-approve { background: var(--green); color: #fff; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: inherit; }
  .btn-reject { background: var(--red-light); color: var(--red); border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: inherit; }

  /* VAULT */
  .vault-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .vault-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem;
  }
  .vault-card-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
  .vault-card-sub { font-size: 12px; color: var(--text-muted); margin-bottom: 1rem; }
  .vault-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 0; border-bottom: 0.5px solid var(--border); font-size: 13px;
  }
  .vault-item:last-child { border-bottom: none; }
  .vault-status-accepted { color: var(--green-dark); font-weight: 500; }
  .vault-status-rejected { color: var(--red); font-weight: 500; }
  .vault-status-pending { color: var(--amber); font-weight: 500; }
  .rejection-reason {
    font-size: 12px; color: var(--text-muted); margin-top: 4px;
    background: var(--bg-secondary); padding: 6px 10px; border-radius: 6px;
  }
  .growth-bar-wrap { margin-bottom: 10px; }
  .growth-bar-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }
  .growth-bar { height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden; }
  .growth-bar-fill { height: 100%; background: var(--green); border-radius: 3px; transition: width 0.6s; }
  .note-input {
    width: 100%; min-height: 80px; padding: 10px; border: 0.5px solid var(--border-dark);
    border-radius: 8px; font-family: inherit; font-size: 13px; color: var(--text);
    background: var(--bg); resize: none; outline: none;
  }
  .note-input:focus { border-color: var(--green); }

  /* FILTER */
  .filter-bar {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1rem 1.25rem;
    display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
    margin-bottom: 1.5rem;
  }
  .filter-label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
  .filter-select {
    padding: 6px 10px; border: 0.5px solid var(--border-dark);
    border-radius: 8px; font-family: inherit; font-size: 13px; background: var(--bg);
    color: var(--text); outline: none; cursor: pointer;
  }
  .filter-chip {
    padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;
    cursor: pointer; border: 0.5px solid var(--border-dark); background: var(--bg);
    color: var(--text-muted); transition: all 0.15s;
  }
  .filter-chip.active { background: var(--green-light); color: var(--green-dark); border-color: var(--green); }

  /* MESSAGE */
  .msg-layout { display: grid; grid-template-columns: 280px 1fr; height: calc(100vh - 56px); }
  .msg-sidebar { border-right: 0.5px solid var(--border); overflow-y: auto; }
  .msg-header { padding: 1rem 1.25rem; border-bottom: 0.5px solid var(--border); font-weight: 500; font-size: 15px; }
  .msg-thread-item {
    padding: 12px 1.25rem; border-bottom: 0.5px solid var(--border);
    cursor: pointer; transition: background 0.1s;
  }
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
  .msg-input {
    flex: 1; padding: 10px 14px; border: 0.5px solid var(--border-dark);
    border-radius: 20px; font-family: inherit; font-size: 14px; outline: none;
    background: var(--bg);
  }
  .msg-input:focus { border-color: var(--green); }

  /* LEADERBOARD */
  .lb-item {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1rem 1.25rem;
    display: flex; align-items: center; gap: 1rem; margin-bottom: 8px;
  }
  .lb-rank { font-size: 18px; font-weight: 600; color: var(--text-muted); width: 32px; text-align: center; }
  .lb-rank.top { color: var(--green); }
  .lb-info { flex: 1; }
  .lb-name { font-size: 14px; font-weight: 500; }
  .lb-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .lb-score { font-size: 16px; font-weight: 600; color: var(--green); }

  /* TRENDING */
  .trending-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem;
  }
  .trend-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 0.5px solid var(--border); }
  .trend-item:last-child { border-bottom: none; }
  .trend-rank { font-size: 12px; font-weight: 600; color: var(--text-muted); width: 20px; }
  .trend-name { flex: 1; font-size: 14px; font-weight: 500; }
  .trend-bar { width: 80px; height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden; }
  .trend-bar-fill { height: 100%; background: var(--green); border-radius: 3px; }
  .trend-count { font-size: 12px; color: var(--text-muted); }

  /* REJECTION MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center; z-index: 200;
  }
  .modal-box {
    background: var(--bg-card); border-radius: var(--radius-xl);
    padding: 1.75rem; width: 400px; border: 0.5px solid var(--border);
  }
  .modal-title { font-size: 16px; font-weight: 500; margin-bottom: 6px; }
  .modal-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 1.25rem; }
  .rejection-option {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border: 0.5px solid var(--border);
    border-radius: var(--radius); margin-bottom: 8px; cursor: pointer;
  }
  .rejection-option:hover { border-color: var(--border-dark); background: var(--bg-secondary); }
  .rejection-option.selected { border-color: var(--red); background: var(--red-light); }
  .rejection-option input { accent-color: var(--red); }
  .rejection-option label { font-size: 14px; cursor: pointer; }
  .modal-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 1.25rem; }

  /* COMPANY DASHBOARD */
  .dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 2rem; }
  .metric-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem;
  }
  .metric-label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
  .metric-value { font-size: 26px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; }

  /* FOOTER */
  .footer {
    border-top: 0.5px solid var(--border); padding: 1.5rem 2rem;
    text-align: center; font-size: 13px; color: var(--text-muted);
  }

  /* TABS */
  .tabs { display: flex; gap: 2px; margin-bottom: 1.5rem; background: var(--bg-secondary); padding: 4px; border-radius: 10px; width: fit-content; }
  .tab-btn {
    padding: 7px 16px; border-radius: 7px; font-size: 14px; font-family: inherit;
    font-weight: 500; cursor: pointer; border: none; background: transparent;
    color: var(--text-muted); transition: all 0.15s;
  }
  .tab-btn.active { background: var(--bg-card); color: var(--text); border: 0.5px solid var(--border); }

  /* COMPANY PORTAL */
  .company-card {
    background: var(--bg-card); border: 0.5px solid var(--border);
    border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 10px;
  }
  .company-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .company-logo {
    width: 44px; height: 44px; border-radius: var(--radius);
    background: var(--blue-light); display: flex; align-items: center;
    justify-content: center; font-weight: 700; font-size: 14px; color: var(--blue);
  }
  .company-name { font-size: 15px; font-weight: 500; }
  .company-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  .page-title { font-size: 24px; font-weight: 500; letter-spacing: -0.4px; margin-bottom: 6px; }
  .page-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 2rem; }
`;

// ============================================================
// DATA
// ============================================================
const ENGINEERS = [
  { id: 1, name: "Tariq Hassan", flag: "🇧🇩", initials: "TH", color: "green", uni: "BUET", dept: "EEE", sem: "6th Semester", domain: "land", status: "student", skills: ["ROS2", "SLAM", "STM32", "KiCAD"], availability: "open", endorsements: 34, verified: true },
  { id: 2, name: "Ahmed Raza", flag: "🇵🇰", initials: "AR", color: "amber", uni: "NUST", dept: "EEE", sem: "7th Semester", domain: "land", status: "student", skills: ["ROS2", "SLAM", "Jetson", "OpenCV"], availability: "open", endorsements: 28, verified: true },
  { id: 3, name: "Sofia Reyes", flag: "🇲🇽", initials: "SR", color: "blue", uni: "UNAM", dept: "Aerospace", sem: "Graduate", domain: "aerial", status: "professional", skills: ["PX4", "MAVLink", "Gazebo", "Python"], availability: "open", endorsements: 41, verified: true },
  { id: 4, name: "Kenji Mori", flag: "🇯🇵", initials: "KM", color: "purple", uni: "Tokyo Tech", dept: "Naval Arch", sem: "Graduate", domain: "marine", status: "professional", skills: ["BlueROV", "ROS2", "Acoustics", "Nav2"], availability: "busy", endorsements: 19, verified: true },
  { id: 5, name: "Layla Hassan", flag: "🇪🇬", initials: "LH", color: "amber", uni: "Cairo Uni", dept: "Mechatronics", sem: "5th Semester", domain: "aerial", status: "student", skills: ["ArduPilot", "PX4", "MAVLink", "C++"], availability: "open", endorsements: 15, verified: true },
  { id: 6, name: "Ivan Petrov", flag: "🇷🇺", initials: "IP", color: "blue", uni: "MIPT", dept: "Robotics", sem: "Graduate", domain: "land", status: "professional", skills: ["ROS2", "MoveIt", "PyTorch", "LIDAR"], availability: "open", endorsements: 52, verified: true },
];

const GIGS = [
  { id: 1, company: "Boston Dynamics", verified: true, domain: "land", title: "ROS2 Navigation Engineer — Humanoid Project", skills: ["ROS2", "SLAM", "MoveIt"], budget: "$3,500", urgency: "immediate", type: "Remote" },
  { id: 2, company: "Autel Robotics", verified: true, domain: "aerial", title: "PX4 Flight Controller Developer", skills: ["PX4", "MAVLink", "C++"], budget: "$2,200", urgency: "1month", type: "Remote" },
  { id: 3, company: "Ocean Infinity", verified: true, domain: "marine", title: "AUV Systems Engineer — Deep Sea Mission", skills: ["BlueROV", "ROS2", "Acoustics"], budget: "$4,800", urgency: "immediate", type: "Onsite" },
  { id: 4, company: "DJI Research", verified: true, domain: "aerial", title: "Swarm Drone Algorithm Developer", skills: ["PX4", "Python", "Gazebo"], budget: "$3,100", urgency: "longterm", type: "Remote" },
  { id: 5, company: "Clearpath Robotics", verified: true, domain: "land", title: "UGV Sensor Fusion Specialist", skills: ["ROS2", "LIDAR", "OpenCV"], budget: "$2,800", urgency: "1month", type: "Hybrid" },
];

const REJECTION_REASONS = [
  "Missing required skills",
  "Not enough projects",
  "Need more experience",
  "Domain mismatch",
  "Budget mismatch",
];

// ============================================================
// HELPERS
// ============================================================
function AvatarEl({ initials, color, size = "md" }) {
  const cls = size === "lg" ? "avatar-lg" : "avatar";
  return <div className={`${cls} avatar-${color}`}>{initials}</div>;
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

// ============================================================
// PAGES
// ============================================================

// ---------- HOMEPAGE ----------
function HomePage({ navigate }) {
  const [selectedDomain, setSelectedDomain] = useState("land");
  return (
    <div className="page">
      <div className="hero">
        <div className="badge-pill">⚡ Zero-fluff. Pure skill. Fully verified.</div>
        <h1>Where <em>real engineers</em><br />meet serious opportunity</h1>
        <p>The world's only verified talent platform for Land Robotics, Aerial Drones, and Marine Systems engineers.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate("register")}>Join as engineer</button>
          <button className="btn btn-outline" onClick={() => navigate("register")}>Hire talent</button>
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
            { id: "land", icon: "🤖", bg: "#EEEDFE", title: "Land Robotics", desc: "Humanoids, UGV, industrial arms and ground-based autonomous systems.", tags: [["ROS2","purple"],["SLAM","purple"],["MoveIt","purple"]], count: 487 },
            { id: "aerial", icon: "🚁", bg: "#E6F1FB", title: "Aerial & Drones", desc: "UAV, quadcopters, fixed-wing and autonomous flight systems.", tags: [["PX4","blue"],["ArduPilot","blue"],["MAVLink","blue"]], count: 412 },
            { id: "marine", icon: "⚓", bg: "#E1F5EE", title: "Marine & Submarines", desc: "AUV, ROV, underwater systems and deep-sea robotics.", tags: [["BlueROV","green"],["Acoustics","green"],["Nav2","green"]], count: 341 },
          ].map(d => (
            <div key={d.id} className={`domain-card ${selectedDomain === d.id ? "selected" : ""}`} onClick={() => { setSelectedDomain(d.id); navigate("engineers"); }}>
              <div className="domain-icon" style={{ background: d.bg }}><span style={{ fontSize: 22 }}>{d.icon}</span></div>
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
          {ENGINEERS.slice(0, 4).map(eng => (
            <div key={eng.id} className="engineer-card" onClick={() => navigate("profile")}>
              <div className="eng-top">
                <AvatarEl initials={eng.initials} color={eng.color} />
                <div>
                  <div className="eng-name">{eng.name} {eng.flag}</div>
                  <div className="eng-meta">{eng.uni} · {eng.dept} · {eng.sem}</div>
                </div>
              </div>
              <div className="badge-row">
                {eng.verified && <VerifiedBadge />}
                {eng.availability === "open" && <span className="badge badge-open">Open to work</span>}
                <DomainBadge domain={eng.domain} />
                {eng.status === "student" && <span className="badge badge-student">Student</span>}
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
          {GIGS.slice(0, 3).map(g => (
            <div key={g.id} className="gig-card" onClick={() => navigate("gigs")}>
              <div className="gig-left">
                <div className="gig-company">{g.company} {g.verified && <VerifiedBadge />}</div>
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

// ---------- REGISTER / LOGIN ----------
function AuthPage({ navigate }) {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("engineer");
  const [step, setStep] = useState(1);

  if (isLogin) return (
    <div className="page">
      <div className="form-card">
        <div className="form-title">Welcome back</div>
        <div className="form-sub">Log in to your AeroHydroRobo account.</div>
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="you@example.com" /></div>
        <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="••••••••" /></div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => navigate("dashboard")}>Log in</button>
        <div className="form-footer">No account? <button onClick={() => setIsLogin(false)}>Register</button></div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="form-card">
        {step === 1 && <>
          <div className="form-title">Create your account</div>
          <div className="form-sub">Join the world's most verified robotics talent network.</div>
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
          <div className="form-group"><label className="form-label">Full name</label><input className="form-input" placeholder="Your full name" /></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="you@example.com" /></div>
          <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Min. 8 characters" /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => setStep(2)}>Continue →</button>
          <div className="form-footer">Already have an account? <button onClick={() => setIsLogin(true)}>Log in</button></div>
        </>}

        {step === 2 && role === "engineer" && <>
          <div className="form-title">Your profile</div>
          <div className="form-sub">Fill in your details. No CV needed — your projects will speak.</div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Country</label><select className="form-select"><option>Bangladesh 🇧🇩</option><option>Pakistan 🇵🇰</option><option>India 🇮🇳</option><option>USA 🇺🇸</option><option>Other</option></select></div>
            <div className="form-group"><label className="form-label">Domain</label><select className="form-select"><option>Land Robotics</option><option>Aerial & Drones</option><option>Marine & Submarines</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">University name</label><input className="form-input" placeholder="e.g. BUET, MIT, NUST" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Department</label><select className="form-select"><option>EEE</option><option>CSE</option><option>Mechanical</option><option>Aerospace</option><option>Naval Architecture</option><option>Robotics</option></select></div>
            <div className="form-group"><label className="form-label">Status</label><select className="form-select"><option>Student</option><option>Fresh Graduate</option><option>Professional</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">Semester (if student)</label><select className="form-select"><option>1st</option><option>2nd</option><option>3rd</option><option>4th</option><option>5th</option><option>6th</option><option>7th</option><option>8th</option></select></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => navigate("verify")}>Next: Verify identity →</button>
        </>}

        {step === 2 && role === "company" && <>
          <div className="form-title">Company details</div>
          <div className="form-sub">Tell us about your company. Verification required before posting gigs.</div>
          <div className="form-group"><label className="form-label">Company name</label><input className="form-input" placeholder="e.g. Boston Dynamics" /></div>
          <div className="form-group"><label className="form-label">Official website</label><input className="form-input" placeholder="https://yourcompany.com" /></div>
          <div className="form-group"><label className="form-label">Official email</label><input className="form-input" placeholder="contact@yourcompany.com" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Company size</label><select className="form-select"><option>Startup (1-50)</option><option>SME (51-500)</option><option>Enterprise (500+)</option></select></div>
            <div className="form-group"><label className="form-label">Country / HQ</label><select className="form-select"><option>USA</option><option>UK</option><option>Germany</option><option>Japan</option><option>Other</option></select></div>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => navigate("verify")}>Next: Verify company →</button>
        </>}
      </div>
    </div>
  );
}

// ---------- VERIFY ----------
function VerifyPage({ navigate }) {
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div className="page">
      <div className="form-card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <div className="form-title">Verification submitted</div>
        <div className="form-sub">Your document is under admin review. You'll be notified once approved. Your ID will be permanently deleted after review — we store nothing.</div>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("dashboard")}>Go to dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div style={{ maxWidth: 560, margin: "2rem auto", padding: "0 2rem" }}>
        <div className="page-title">Identity verification</div>
        <div className="page-sub">One-time process. Your document is permanently deleted after review.</div>

        <div className="verify-step">
          <div className="step-num done">✓</div>
          <div><div className="step-title">Account created</div><div className="step-sub">Basic info saved successfully.</div></div>
        </div>

        <div className="verify-step">
          <div className={`step-num ${uploaded ? "done" : ""}`}>{uploaded ? "✓" : "2"}</div>
          <div style={{ flex: 1 }}>
            <div className="step-title">Upload ID document</div>
            <div className="step-sub">NID, Passport, or Student ID. Accepted: JPG, PNG, PDF.</div>
            {!uploaded && (
              <div className="upload-area" onClick={() => setUploaded(true)}>
                <div style={{ fontSize: 28 }}>📄</div>
                <div className="upload-text">Click to upload or drag and drop</div>
              </div>
            )}
            {uploaded && <div style={{ marginTop: 10, fontSize: 13, color: "var(--green-dark)", fontWeight: 500 }}>✓ document_id.jpg uploaded</div>}
            <div className="purge-note">🔒 This document will be permanently deleted from our servers immediately after admin review. We never store personal ID data.</div>
          </div>
        </div>

        <div className="verify-step" style={{ opacity: uploaded ? 1 : 0.5 }}>
          <div className="step-num">3</div>
          <div><div className="step-title">Admin review</div><div className="step-sub">Usually within 24 hours. Result: ✅ Verified badge or rejection with reason.</div></div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} disabled={!uploaded} onClick={() => setSubmitted(true)}>Submit for review</button>
      </div>
    </div>
  );
}

// ---------- ENGINEER DASHBOARD ----------
function DashboardPage({ navigate }) {
  const [tab, setTab] = useState("overview");
  return (
    <div className="page">
      <div className="container section">
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2rem" }}>
          <AvatarEl initials="TH" color="green" size="lg" />
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.3px" }}>Tariq Hassan 🇧🇩</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>BUET · EEE · 6th Semester</div>
            <div className="badge-row" style={{ marginTop: 10 }}>
              <VerifiedBadge />
              <span className="badge badge-open">Open to work</span>
              <DomainBadge domain="land" />
              <span className="badge badge-student">Student</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-primary btn-sm" onClick={() => navigate("profile")}>View public profile</button>
              <button className="btn btn-outline btn-sm">Edit profile</button>
            </div>
          </div>
        </div>

        <div className="tabs">
          {["overview", "applications", "vault"].map(t => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        {tab === "overview" && <>
          <div className="dash-grid">
            <div className="metric-card"><div className="metric-label">Profile views</div><div className="metric-value">142</div></div>
            <div className="metric-card"><div className="metric-label">Endorsements</div><div className="metric-value">34</div></div>
            <div className="metric-card"><div className="metric-label">Applications</div><div className="metric-value">8</div></div>
          </div>
          <div className="sec-header"><div className="sec-title">Recommended gigs</div><button className="sec-link" onClick={() => navigate("gigs")}>View all →</button></div>
          {GIGS.filter(g => g.domain === "land").map(g => (
            <div key={g.id} className="gig-card" style={{ marginBottom: 10 }}>
              <div className="gig-left">
                <div className="gig-company">{g.company} {g.verified && <VerifiedBadge />}</div>
                <div className="gig-title">{g.title}</div>
                <div className="tag-row">{g.skills.map(s => <span key={s} className="tag tag-purple">{s}</span>)}</div>
              </div>
              <div className="gig-right">
                <div className="gig-budget">{g.budget}</div>
                <UrgencyBadge urgency={g.urgency} />
              </div>
            </div>
          ))}
        </>}

        {tab === "applications" && <ApplicationsTab navigate={navigate} />}
        {tab === "vault" && <VaultPage />}
      </div>
    </div>
  );
}

// ---------- APPLICATIONS TAB ----------
function ApplicationsTab({ navigate }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const apps = [
    { gig: "ROS2 Navigation Engineer", company: "Boston Dynamics", date: "Jun 1", status: "pending" },
    { gig: "UGV Sensor Fusion Specialist", company: "Clearpath Robotics", date: "May 28", status: "rejected", reason: "Missing required skills", auto: "Improve: LIDAR, OpenCV" },
    { gig: "PX4 Flight Controller Dev", company: "Autel Robotics", date: "May 20", status: "accepted" },
  ];
  return (
    <div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Quick rejection reason</div>
            <div className="modal-sub">Optional — helps the engineer improve. Takes 2 seconds.</div>
            {REJECTION_REASONS.map(r => (
              <div key={r} className={`rejection-option ${selectedReason === r ? "selected" : ""}`} onClick={() => setSelectedReason(r)}>
                <input type="radio" checked={selectedReason === r} onChange={() => {}} />
                <label>{r}</label>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Skip</button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {apps.map((a, i) => (
          <div key={i} className="company-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{a.gig}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>{a.company} · Applied {a.date}</div>
              </div>
              <span className={`badge ${a.status === "accepted" ? "badge-open" : a.status === "rejected" ? "" : "badge-student"}`}
                style={a.status === "rejected" ? { background: "var(--red-light)", color: "var(--red)" } : {}}>
                {a.status === "pending" ? "⏳ Pending" : a.status === "accepted" ? "✓ Accepted" : "✕ Rejected"}
              </span>
            </div>
            {a.status === "rejected" && (
              <div>
                <div className="rejection-reason" style={{ marginTop: 10 }}>
                  {a.reason && <div>Company feedback: <strong>{a.reason}</strong></div>}
                  {a.auto && <div style={{ marginTop: 4 }}>💡 Auto-analysis: <strong>{a.auto}</strong></div>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- VAULT ----------
function VaultPage() {
  const [note, setNote] = useState("");
  return (
    <div>
      <div style={{ background: "var(--green-light)", border: "0.5px solid var(--green)", borderRadius: "var(--radius-lg)", padding: "12px 16px", marginBottom: "1.5rem", fontSize: 13, color: "var(--green-dark)" }}>
        🔒 Your vault is 100% private. Data is stored only in your browser — never on our servers. Only you can see this.
      </div>
      <div className="vault-grid">
        <div className="vault-card">
          <div className="vault-card-title">📊 Rejection analysis</div>
          <div className="vault-card-sub">Based on your rejections so far</div>
          {[["LIDAR", 80], ["OpenCV", 65], ["Nav2", 40]].map(([skill, pct]) => (
            <div key={skill} className="growth-bar-wrap">
              <div className="growth-bar-label"><span>{skill}</span><span>{pct}% gap</span></div>
              <div className="growth-bar"><div className="growth-bar-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>

        <div className="vault-card">
          <div className="vault-card-title">📈 Growth tracker</div>
          <div className="vault-card-sub">Your progress over time</div>
          {[["Skills added", 6, 10], ["Endorsements", 34, 50], ["Profile views", 142, 200]].map(([label, val, max]) => (
            <div key={label} className="growth-bar-wrap">
              <div className="growth-bar-label"><span>{label}</span><span>{val}</span></div>
              <div className="growth-bar"><div className="growth-bar-fill" style={{ width: `${(val / max) * 100}%` }} /></div>
            </div>
          ))}
        </div>

        <div className="vault-card">
          <div className="vault-card-title">🎯 Dream goals</div>
          <div className="vault-card-sub">Private targets</div>
          {["Boston Dynamics — Humanoid team", "Learn Nav2 + LIDAR by August", "Get 50 endorsements"].map((g, i) => (
            <div key={i} className="vault-item"><span>{g}</span><span style={{ fontSize: 12, color: "var(--green-dark)" }}>●</span></div>
          ))}
        </div>

        <div className="vault-card">
          <div className="vault-card-title">🔗 Private links</div>
          <div className="vault-card-sub">Not visible to anyone</div>
          {["github.com/tariq/private-auv", "drive.google.com/my-cad-files", "notion.so/learning-notes"].map((l, i) => (
            <div key={i} className="vault-item"><span style={{ fontSize: 12, fontFamily: "DM Mono, monospace" }}>{l}</span></div>
          ))}
        </div>

        <div className="vault-card" style={{ gridColumn: "1 / -1" }}>
          <div className="vault-card-title">📔 Personal notes</div>
          <div className="vault-card-sub">Write anything. Stored locally only.</div>
          <textarea className="note-input" value={note} onChange={e => setNote(e.target.value)} placeholder="Write your thoughts, plans, ideas..." />
        </div>
      </div>
    </div>
  );
}

// ---------- ENGINEER PROFILE (PUBLIC) ----------
function ProfilePage({ navigate }) {
  return (
    <div className="page">
      <div className="profile-header">
        <div className="container">
          <div className="profile-top">
            <AvatarEl initials="TH" color="green" size="lg" />
            <div>
              <div className="profile-name">Tariq Hassan 🇧🇩</div>
              <div className="profile-sub">BUET · EEE · 6th Semester · Land Robotics</div>
              <div className="badge-row">
                <VerifiedBadge />
                <span className="badge badge-open">Open to work</span>
                <DomainBadge domain="land" />
                <span className="badge badge-student">Student</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>Remote · $500–$1000 · English, Bengali · ⭐ 34 endorsements</div>
              <div className="profile-actions">
                <button className="btn btn-primary btn-sm">Connect</button>
                <button className="btn btn-outline btn-sm">Endorse skill</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container section">
        <div className="sec-title" style={{ marginBottom: "1rem" }}>Skills</div>
        <div className="skill-row" style={{ marginBottom: "2rem" }}>
          {["ROS2", "SLAM", "STM32", "KiCAD", "Nav2", "Embedded Systems", "Sensor Fusion"].map(s => (
            <span key={s} className="tag tag-gray" style={{ fontSize: 13, padding: "5px 12px" }}>{s}</span>
          ))}
        </div>
        <div className="sec-title" style={{ marginBottom: "1rem" }}>Projects <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 400 }}>(max 3)</span></div>
        {[
          { name: "Autonomous Ground Vehicle — BUET Robotics", contrib: "Designed full ROS2 navigation stack with SLAM-based mapping. Achieved 95% success rate in dynamic obstacle avoidance.", hw: "Pixhawk, Jetson Nano", sw: "ROS2, Nav2, SLAM" },
          { name: "STM32 Motor Controller PCB", contrib: "Designed 4-layer PCB for brushless motor control with real-time encoder feedback. Board used in 3 other university projects.", hw: "STM32, Custom PCB", sw: "KiCAD, FreeRTOS" },
        ].map((p, i) => (
          <div key={i} className="project-card">
            <div className="project-title">{p.name}</div>
            <div className="project-contrib">{p.contrib}</div>
            <div className="project-meta">
              <span className="tag tag-gray">HW: {p.hw}</span>
              <span className="tag tag-gray">SW: {p.sw}</span>
            </div>
            <div className="project-links">
              <a className="link-btn" href="#">⌥ GitHub</a>
              <a className="link-btn" href="#">📐 CAD</a>
              <a className="link-btn" href="#">▶ Video</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- ENGINEERS LIST ----------
function EngineersPage({ navigate }) {
  const [domain, setDomain] = useState("all");
  const [availability, setAvailability] = useState("all");
  const filtered = ENGINEERS.filter(e => (domain === "all" || e.domain === domain) && (availability === "all" || e.availability === availability));
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
          <span className="filter-label" style={{ marginLeft: 8 }}>Availability:</span>
          {["all", "open"].map(a => (
            <button key={a} className={`filter-chip ${availability === a ? "active" : ""}`} onClick={() => setAvailability(a)}>
              {a === "all" ? "All" : "Open to work"}
            </button>
          ))}
        </div>
        <div className="grid-3">
          {filtered.map(eng => (
            <div key={eng.id} className="engineer-card" onClick={() => navigate("profile")}>
              <div className="eng-top">
                <AvatarEl initials={eng.initials} color={eng.color} />
                <div>
                  <div className="eng-name">{eng.name} {eng.flag}</div>
                  <div className="eng-meta">{eng.uni} · {eng.dept}</div>
                </div>
              </div>
              <div className="badge-row">
                {eng.verified && <VerifiedBadge />}
                {eng.availability === "open" && <span className="badge badge-open">Open</span>}
                <DomainBadge domain={eng.domain} />
              </div>
              <div className="skill-row">{eng.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10 }}>⭐ {eng.endorsements} endorsements</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- GIGS ----------
function GigsPage({ navigate }) {
  const [domain, setDomain] = useState("all");
  const [urgency, setUrgency] = useState("all");
  const filtered = GIGS.filter(g => (domain === "all" || g.domain === domain) && (urgency === "all" || g.urgency === urgency));
  return (
    <div className="page">
      <div className="container section">
        <div className="page-title">Active gigs</div>
        <div className="page-sub">Only verified companies can post. No fake jobs.</div>
        <div className="filter-bar">
          <span className="filter-label">Domain:</span>
          {["all", "land", "aerial", "marine"].map(d => (
            <button key={d} className={`filter-chip ${domain === d ? "active" : ""}`} onClick={() => setDomain(d)}>
              {d === "all" ? "All" : d === "land" ? "🤖 Land" : d === "aerial" ? "🚁 Aerial" : "⚓ Marine"}
            </button>
          ))}
          <span className="filter-label" style={{ marginLeft: 8 }}>Urgency:</span>
          {["all", "immediate", "1month", "longterm"].map(u => (
            <button key={u} className={`filter-chip ${urgency === u ? "active" : ""}`} onClick={() => setUrgency(u)}>
              {u === "all" ? "All" : u === "immediate" ? "Immediate" : u === "1month" ? "1 Month" : "Long Term"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(g => (
            <div key={g.id} className="gig-card">
              <div className="gig-left">
                <div className="gig-company">{g.company} {g.verified && <VerifiedBadge />} <span style={{ marginLeft: 4 }}>{g.type}</span></div>
                <div className="gig-title">{g.title}</div>
                <div className="tag-row">{g.skills.map(s => <span key={s} className={`tag tag-${g.domain === "land" ? "purple" : g.domain === "aerial" ? "blue" : "green"}`}>{s}</span>)}</div>
              </div>
              <div className="gig-right">
                <div className="gig-budget">{g.budget}</div>
                <UrgencyBadge urgency={g.urgency} />
                <div style={{ marginTop: 8 }}><button className="btn btn-primary btn-sm">Apply</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- COMPANY DASHBOARD ----------
function CompanyDashboardPage({ navigate }) {
  const [tab, setTab] = useState("gigs");
  return (
    <div className="page">
      <div className="container section">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "2rem" }}>
          <div className="company-logo" style={{ width: 56, height: 56, fontSize: 18 }}>BD</div>
          <div>
            <div className="page-title" style={{ marginBottom: 4 }}>Boston Dynamics</div>
            <div className="badge-row">
              <VerifiedBadge />
              <span className="badge badge-domain-blue">Enterprise</span>
              <DomainBadge domain="land" />
            </div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="metric-card"><div className="metric-label">Active gigs</div><div className="metric-value">3</div></div>
          <div className="metric-card"><div className="metric-label">Total applications</div><div className="metric-value">47</div></div>
          <div className="metric-card"><div className="metric-label">Engineers hired</div><div className="metric-value">12</div></div>
        </div>

        <div className="tabs">
          {["gigs", "talent", "applications"].map(t => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        {tab === "gigs" && <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <button className="btn btn-primary btn-sm">+ Post new gig</button>
          </div>
          {GIGS.filter(g => g.company === "Boston Dynamics").map(g => (
            <div key={g.id} className="gig-card" style={{ marginBottom: 10 }}>
              <div className="gig-left">
                <div className="gig-title">{g.title}</div>
                <div className="tag-row">{g.skills.map(s => <span key={s} className="tag tag-purple">{s}</span>)}</div>
              </div>
              <div className="gig-right">
                <div className="gig-budget">{g.budget}</div>
                <UrgencyBadge urgency={g.urgency} />
              </div>
            </div>
          ))}
        </>}

        {tab === "talent" && <>
          <div className="filter-bar">
            <span className="filter-label">Filter:</span>
            {["All", "ROS2", "SLAM", "MoveIt"].map(f => (
              <button key={f} className="filter-chip">{f}</button>
            ))}
          </div>
          <div className="grid-2">
            {ENGINEERS.filter(e => e.domain === "land").map(eng => (
              <div key={eng.id} className="engineer-card">
                <div className="eng-top">
                  <AvatarEl initials={eng.initials} color={eng.color} />
                  <div>
                    <div className="eng-name">{eng.name} {eng.flag}</div>
                    <div className="eng-meta">{eng.uni} · {eng.dept}</div>
                  </div>
                </div>
                <div className="badge-row">
                  {eng.verified && <VerifiedBadge />}
                  {eng.availability === "open" && <span className="badge badge-open">Open</span>}
                </div>
                <div className="skill-row">{eng.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}</div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>Send message</button>
              </div>
            ))}
          </div>
        </>}

        {tab === "applications" && <>
          {[
            { name: "Tariq Hassan", flag: "🇧🇩", initials: "TH", color: "green", gig: "ROS2 Navigation Engineer", date: "Jun 1" },
            { name: "Ivan Petrov", flag: "🇷🇺", initials: "IP", color: "blue", gig: "ROS2 Navigation Engineer", date: "Jun 2" },
          ].map((a, i) => (
            <div key={i} className="queue-item">
              <AvatarEl initials={a.initials} color={a.color} />
              <div className="queue-info">
                <div className="queue-name">{a.name} {a.flag}</div>
                <div className="queue-sub">Applied for: {a.gig} · {a.date}</div>
              </div>
              <div className="queue-actions">
                <button className="btn-approve">Accept</button>
                <button className="btn-reject">Reject</button>
              </div>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ---------- ADMIN PANEL ----------
function AdminPage() {
  const [section, setSection] = useState("queue");
  const [items, setItems] = useState([
    { id: 1, name: "Md. Rafiq Islam", type: "Engineer", doc: "NID", country: "🇧🇩", time: "2 hrs ago" },
    { id: 2, name: "DroneCore Ltd.", type: "Company", doc: "Business Reg.", country: "🇩🇪", time: "5 hrs ago" },
    { id: 3, name: "Yuki Tanaka", type: "Engineer", doc: "Student ID", country: "🇯🇵", time: "8 hrs ago" },
  ]);

  const approve = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const reject = (id) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div className="page admin-layout">
      <div className="admin-sidebar">
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 12, padding: "0 10px" }}>ADMIN</div>
        {[["queue", "⏳", "Verify queue"], ["engineers", "🛠️", "Engineers"], ["companies", "🏢", "Companies"], ["gigs", "📋", "Gigs"]].map(([id, icon, label]) => (
          <button key={id} className={`sidebar-item ${section === id ? "active" : ""}`} onClick={() => setSection(id)}>
            <span>{icon}</span>{label}
            {id === "queue" && items.length > 0 && <span style={{ marginLeft: "auto", background: "var(--red)", color: "#fff", borderRadius: "20px", padding: "1px 7px", fontSize: 11 }}>{items.length}</span>}
          </button>
        ))}
      </div>
      <div className="admin-main">
        {section === "queue" && <>
          <div className="page-title">Verification queue</div>
          <div className="page-sub">Review documents. They are permanently deleted after your decision.</div>
          {items.length === 0 && <div style={{ fontSize: 15, color: "var(--text-muted)", padding: "2rem 0" }}>✓ Queue is empty.</div>}
          {items.map(item => (
            <div key={item.id} className="queue-item">
              <div className="queue-info">
                <div className="queue-name">{item.name} {item.country}</div>
                <div className="queue-sub">{item.type} · {item.doc} · {item.time}</div>
              </div>
              <div style={{ marginRight: 12 }}>
                <a className="link-btn" href="#">View doc</a>
              </div>
              <div className="queue-actions">
                <button className="btn-approve" onClick={() => approve(item.id)}>Approve → Delete ID</button>
                <button className="btn-reject" onClick={() => reject(item.id)}>Reject → Delete ID</button>
              </div>
            </div>
          ))}
        </>}
        {section === "engineers" && <>
          <div className="page-title">All engineers</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ENGINEERS.map(eng => (
              <div key={eng.id} className="queue-item">
                <AvatarEl initials={eng.initials} color={eng.color} />
                <div className="queue-info">
                  <div className="queue-name">{eng.name} {eng.flag}</div>
                  <div className="queue-sub">{eng.uni} · {eng.dept} · {eng.domain}</div>
                </div>
                <VerifiedBadge />
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}

// ---------- MESSAGES ----------
function MessagesPage() {
  const [active, setActive] = useState(0);
  const [msg, setMsg] = useState("");
  const threads = [
    { name: "Boston Dynamics", preview: "We'd love to discuss...", msgs: [{ text: "Hi, we reviewed your profile and are impressed.", sent: false }, { text: "Thank you! I'm very interested in the role.", sent: true }, { text: "Can you do a quick call this week?", sent: false }] },
    { name: "Ocean Infinity", preview: "Thanks for applying!", msgs: [{ text: "Thanks for applying to our AUV position.", sent: false }, { text: "I have experience with BlueROV and underwater acoustics.", sent: true }] },
  ];
  return (
    <div className="msg-layout">
      <div className="msg-sidebar">
        <div className="msg-header">Messages</div>
        {threads.map((t, i) => (
          <div key={i} className={`msg-thread-item ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>
            <div className="msg-thread-name">{t.name} <VerifiedBadge /></div>
            <div className="msg-thread-preview">{t.preview}</div>
          </div>
        ))}
      </div>
      <div className="msg-main">
        <div className="msg-top">
          <div style={{ fontWeight: 500, fontSize: 15 }}>{threads[active].name}</div>
          <VerifiedBadge />
        </div>
        <div className="msg-body">
          {threads[active].msgs.map((m, i) => (
            <div key={i} className={`msg-bubble ${m.sent ? "sent" : "recv"}`}>{m.text}</div>
          ))}
        </div>
        <div className="msg-input-bar">
          <input className="msg-input" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message..." />
          <button className="btn btn-primary" onClick={() => setMsg("")}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ---------- LEADERBOARD ----------
function LeaderboardPage({ navigate }) {
  return (
    <div className="page">
      <div className="container section">
        <div className="page-title">Leaderboard</div>
        <div className="page-sub">Most endorsed engineers this month.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
          <div>
            {ENGINEERS.sort((a, b) => b.endorsements - a.endorsements).map((eng, i) => (
              <div key={eng.id} className="lb-item" style={{ cursor: "pointer" }} onClick={() => navigate("profile")}>
                <div className={`lb-rank ${i < 3 ? "top" : ""}`}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</div>
                <AvatarEl initials={eng.initials} color={eng.color} />
                <div className="lb-info">
                  <div className="lb-name">{eng.name} {eng.flag}</div>
                  <div className="lb-sub">{eng.uni} · <DomainBadge domain={eng.domain} /></div>
                </div>
                <div className="lb-score">⭐ {eng.endorsements}</div>
              </div>
            ))}
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

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: "engineers", label: "Engineers" },
    { id: "companies", label: "Companies" },
    { id: "gigs", label: "Gigs" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "messages", label: "Messages" },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "register": return <AuthPage navigate={navigate} />;
      case "verify": return <VerifyPage navigate={navigate} />;
      case "dashboard": return <DashboardPage navigate={navigate} />;
      case "profile": return <ProfilePage navigate={navigate} />;
      case "engineers": return <EngineersPage navigate={navigate} />;
      case "gigs": return <GigsPage navigate={navigate} />;
      case "companies": return <CompanyDashboardPage navigate={navigate} />;
      case "admin": return <AdminPage />;
      case "messages": return <MessagesPage />;
      case "leaderboard": return <LeaderboardPage navigate={navigate} />;
      default: return <HomePage navigate={navigate} />;
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
          <button className="nav-link" onClick={() => navigate("admin")}>Admin</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("register")}>Get started</button>
        </div>
      </div>
      {renderPage()}
    </>
  );
}
