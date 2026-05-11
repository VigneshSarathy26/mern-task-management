import React, { useState, useMemo } from 'react';
import { 
  Layout, 
  CheckSquare, 
  BarChart3, 
  Bell, 
  User, 
  Plus, 
  Inbox, 
  Calendar, 
  Clock, 
  Star, 
  Search, 
  MoreHorizontal, 
  ChevronRight,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  X,
  Settings,
  Users,
  LogOut,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, activeProject, setActiveProject }) => (
  <div className="w-64 bg-zinc-50 border-r border-zinc-200 h-screen flex flex-col p-4 fixed left-0 top-0">
    <div className="flex items-center gap-2 mb-10 px-2">
      <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
        <Layout className="text-white w-5 h-5" />
      </div>
      <span className="font-bold text-lg tracking-tight">Kanban Board</span>
    </div>

    <div className="space-y-1 mb-10">
      {[
        { icon: Inbox, label: 'Inbox' },
        { icon: Calendar, label: 'Today' },
        { icon: Clock, label: 'Upcoming' },
        { icon: CheckCircle2, label: 'Completed' },
      ].map((item, i) => (
        <button 
          key={i} 
          onClick={() => setActiveTab(item.label)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
            activeTab === item.label ? 'bg-zinc-200 text-black font-semibold' : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-black'
          }`}
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        </button>
      ))}
    </div>

    <div className="mb-10">
      <div className="flex items-center justify-between px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        Team Projects
        <ChevronRight className="w-3 h-3 rotate-90" />
      </div>
      <div className="space-y-1">
        {[
          'Product Launch Q3',
          'Marketing Campaign',
          'API v2.0',
        ].map((project, i) => (
          <button 
            key={i} 
            onClick={() => setActiveProject(project)}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
              activeProject === project ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-zinc-600 hover:bg-zinc-200/50'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full mr-3 ${activeProject === project ? 'bg-blue-600' : 'bg-transparent'}`} />
            {project}
          </button>
        ))}
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        Team Members
        <ChevronRight className="w-3 h-3 rotate-90" />
      </div>
      <div className="space-y-3 px-3">
        {[
          { name: 'Sarah J.', status: 'Active Now', avatar: 'S', color: 'bg-indigo-100 text-indigo-600' },
          { name: 'Mike L.', status: 'Active Now', avatar: 'M', color: 'bg-emerald-100 text-emerald-600' },
          { name: 'Jason K.', status: 'Last seen 5m', avatar: 'J', color: 'bg-amber-100 text-amber-600' },
          { name: 'Chloe B.', status: 'Last seen 5m', avatar: 'C', color: 'bg-rose-100 text-rose-600' },
        ].map((member, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-zinc-100/50 p-1 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${member.color}`}>
                {member.avatar}
              </div>
              <div className="text-xs">
                <p className="font-medium text-zinc-800">{member.name}</p>
              </div>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active Now' ? 'bg-green-500' : 'bg-zinc-300'}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TaskCard = ({ task, onClick }) => (
  <motion.div 
    whileHover={{ y: -2, scale: 1.01 }}
    onClick={onClick}
    className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm cursor-pointer hover:border-blue-400 transition-all group"
  >
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-semibold text-sm leading-tight text-zinc-800 group-hover:text-blue-600 transition-colors">
        {task.title}
      </h4>
      <button className="text-zinc-300 hover:text-zinc-600 transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    
    <div className="flex flex-wrap gap-2 mb-4">
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
        task.priority === 'High' ? 'bg-red-50 text-red-600' : 
        task.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 
        'bg-green-50 text-green-600'
      }`}>
        {task.priority}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
        <Calendar className="w-3 h-3" />
        {task.date}
      </div>
      <div className="flex -space-x-2">
        {['M', 'S'].map((init, i) => (
          <div key={i} className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold ${i === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
            {init}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const KanbanColumn = ({ title, tasks, onTaskClick, onAddTask }) => (
  <div className="flex-1 min-w-[280px]">
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-zinc-800">{title}</h3>
        <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <button className="text-zinc-400 hover:text-zinc-600">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    <div className="space-y-3">
      {tasks.map((task, i) => (
        <TaskCard key={i} task={task} onClick={() => onTaskClick(task)} />
      ))}
      <button 
        onClick={() => onAddTask(title)}
        className="w-full py-2 border-2 border-dashed border-zinc-200 rounded-xl text-zinc-400 hover:border-zinc-300 hover:text-zinc-500 transition-all text-sm font-medium flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Task
      </button>
    </div>
  </div>
);

const UserDropdown = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-2 z-[100]"
  >
    <div className="p-3 border-b border-zinc-50 mb-1">
      <p className="text-xs font-bold text-zinc-900">Vignesh Sarathy</p>
      <p className="text-[10px] text-zinc-400">admin@protocol.app</p>
    </div>
    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-all">
      <UserCircle className="w-4 h-4" /> Profile
    </button>
    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-all">
      <Settings className="w-4 h-4" /> Settings
    </button>
    <div className="h-px bg-zinc-50 my-1" />
    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all">
      <LogOut className="w-4 h-4" /> Logout
    </button>
  </motion.div>
);

const TaskDetails = ({ task, onClose }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="fixed right-0 top-0 w-[450px] bg-white h-screen shadow-2xl border-l border-zinc-200 z-[100] flex flex-col"
  >
    <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
      <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
        <X className="w-5 h-5 text-zinc-400" />
      </button>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
          <Star className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 leading-tight">{task.title}</h2>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Priority</p>
          <div className="flex items-center gap-2">
             <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              task.priority === 'High' ? 'bg-red-50 text-red-600' : 
              task.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 
              'bg-green-50 text-green-600'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Due Date</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <Calendar className="w-4 h-4 text-zinc-400" />
            {task.date}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Status</p>
        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
          <option>Backlog</option>
          <option>To Do</option>
          <option selected>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Description</p>
        <div className="bg-zinc-50 rounded-xl p-4 text-sm text-zinc-600 min-h-[120px] border border-zinc-100 leading-relaxed">
          {task.description || "Initialize the workspace by connecting the identity protocol to the task orchestration engine."}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Subtasks</p>
          <span className="text-xs font-bold text-zinc-400">2/4</span>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Complete UI Mockups', checked: true },
            { label: 'Finalize MERN Backend Auth', checked: true },
            { label: 'Check q3 Release Notes', checked: false },
            { label: 'Checklist Subtasks', checked: false },
          ].map((subtask, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${subtask.checked ? 'bg-blue-600 border-blue-600' : 'border-zinc-300 group-hover:border-blue-400'}`}>
                {subtask.checked && <CheckSquare className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm ${subtask.checked ? 'text-zinc-400 line-through' : 'text-zinc-700 font-medium'}`}>{subtask.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase text-zinc-400 mb-4 tracking-widest">Collaboration</p>
        <div className="space-y-6">
          {[
            { user: 'Mike L.', time: '5m ago', text: 'Need a quick review of the controller logic.', avatar: 'M', color: 'bg-emerald-100 text-emerald-600' },
            { user: 'Jason K.', time: '2m ago', text: 'On it! Will check after the standup.', avatar: 'J', color: 'bg-amber-100 text-amber-600' },
          ].map((comment, i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${comment.color}`}>
                {comment.avatar}
              </div>
              <div className="flex-1 bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-zinc-800">{comment.user}</span>
                  <span className="text-[10px] text-zinc-400 font-medium">{comment.time}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="p-6 border-t border-zinc-100">
      <div className="relative">
        <input 
          placeholder="Write a message..." 
          className="w-full bg-zinc-50 border-zinc-200 border rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white shadow-lg shadow-blue-200 rounded-lg hover:bg-blue-700 transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const NotificationDropdown = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 z-[100]"
  >
    <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-50">
      <h3 className="font-bold text-sm">Notifications</h3>
      <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Mark all as read</button>
    </div>
    <div className="space-y-4">
      {[
        { user: 'Sarah J.', action: 'assigned you to', item: 'Auth Migration', time: '2m ago', color: 'bg-indigo-100 text-indigo-600' },
        { user: 'Mike L.', action: 'commented on', item: 'UI Mockups', time: '1h ago', color: 'bg-emerald-100 text-emerald-600' },
      ].map((notif, i) => (
        <div key={i} className="flex gap-3 cursor-pointer hover:bg-zinc-50 p-2 rounded-xl transition-colors">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${notif.color}`}>
            {notif.user[0]}
          </div>
          <div className="flex-1">
            <p className="text-[11px] leading-tight">
              <span className="font-bold">{notif.user}</span> {notif.action} <span className="font-bold text-blue-600">{notif.item}</span>
            </p>
            <span className="text-[9px] text-zinc-400 font-medium">{notif.time}</span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('Inbox');
  const [activeProject, setActiveProject] = useState('Product Launch Q3');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('kanban');

  const [tasks, setTasks] = useState({
    'Backlog': [
      { title: 'Complete UI Mockups for design', priority: 'Low', date: 'Oct 15', tab: 'Inbox' },
    ],
    'To Do': [
      { title: 'Complete MERN Backend Auth', priority: 'Medium', date: 'Oct 18', tab: 'Today' },
      { title: 'Prepare MERN Backend Auth', priority: 'Medium', date: 'Oct 18', tab: 'Upcoming' },
    ],
    'In Progress': [
      { title: 'Complete UI Mockups', priority: 'High', date: 'Oct 18', tab: 'Inbox' },
      { title: 'Finalize MERN Backend Auth', priority: 'Medium', date: 'Oct 18', tab: 'Today' },
      { title: 'Write Q3 Release Notes', priority: 'Low', date: 'Oct 15', tab: 'Inbox' },
    ],
    'Done': [
      { title: 'Finalize MERN Backend Auth', priority: 'Low', date: 'Oct 15', tab: 'Completed' },
    ]
  });

  const handleAddTask = (column) => {
    const title = prompt('Enter task title:');
    if (!title) return;
    
    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], { 
        title, 
        priority: 'Medium', 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        tab: activeTab 
      }]
    }));
  };

  const filteredTasks = useMemo(() => {
    const result = {};
    Object.entries(tasks).forEach(([col, colTasks]) => {
      let filtered = colTasks;
      
      // Filter by Tab
      if (activeTab !== 'Inbox') {
        filtered = filtered.filter(t => t.tab === activeTab);
      }
      
      // Filter by Search
      if (searchQuery) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      
      result[col] = filtered;
    });
    return result;
  }, [tasks, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-['Inter'] selection:bg-blue-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeProject={activeProject} 
        setActiveProject={setActiveProject} 
      />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleAddTask('To Do')}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
              >
                <Plus className="w-4 h-4" /> New Task
              </button>
              <div className="flex bg-zinc-100 p-1 rounded-xl shadow-inner">
                <button 
                  onClick={() => setActiveView('kanban')}
                  className={`p-1.5 rounded-lg transition-all ${activeView === 'kanban' ? 'bg-white shadow-sm text-blue-600' : 'text-zinc-400'}`}
                >
                  <Layout className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveView('list')}
                  className={`p-1.5 rounded-lg transition-all ${activeView === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-zinc-400'}`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveView('calendar')}
                  className={`p-1.5 rounded-lg transition-all ${activeView === 'calendar' ? 'bg-white shadow-sm text-blue-600' : 'text-zinc-400'}`}
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? 'text-blue-600' : 'text-zinc-400 group-focus-within:text-blue-600'}`} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..." 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUserMenuOpen(false);
                  }}
                  className={`p-2.5 transition-all relative rounded-xl hover:bg-zinc-100 ${notificationsOpen ? 'bg-zinc-100 text-blue-600' : 'text-zinc-400'}`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <AnimatePresence>{notificationsOpen && <NotificationDropdown />}</AnimatePresence>
              </div>

              <div className="relative">
                <div 
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotificationsOpen(false);
                  }}
                  className={`w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border-2 transition-all cursor-pointer hover:shadow-md ${userMenuOpen ? 'border-blue-500 shadow-lg' : 'border-zinc-100'}`}
                >
                  <User className={`w-5 h-5 ${userMenuOpen ? 'text-blue-600' : 'text-zinc-500'}`} />
                </div>
                <AnimatePresence>{userMenuOpen && <UserDropdown />}</AnimatePresence>
              </div>
            </div>
          </div>

          {/* Project Title Section */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-black tracking-tight text-zinc-900">{activeProject}</h1>
                <div className="flex -space-x-3">
                  {[
                    { c: 'bg-indigo-100 text-indigo-600', l: 'S' },
                    { c: 'bg-emerald-100 text-emerald-600', l: 'M' },
                    { c: 'bg-amber-100 text-amber-600', l: 'J' },
                    { c: 'bg-rose-100 text-rose-600', l: 'C' },
                  ].map((m, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -4, zIndex: 10 }}
                      className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-xs font-black shadow-sm cursor-pointer transition-all ${m.c}`}
                    >
                      {m.l}
                    </motion.div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-zinc-50 flex items-center justify-center text-[10px] font-black text-zinc-400 hover:bg-zinc-100 transition-all cursor-pointer">
                    +2
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-400 font-semibold tracking-wide uppercase">
                6 Active Contributors • <span className="text-blue-600">{activeTab} View</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 text-blue-600 rounded-2xl text-xs font-black border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                Live Workspace
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
            {Object.entries(filteredTasks).map(([title, tasks], i) => (
              <KanbanColumn 
                key={i} 
                title={title} 
                tasks={tasks} 
                onTaskClick={(task) => setSelectedTask(task)} 
                onAddTask={handleAddTask}
              />
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            />
            <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
