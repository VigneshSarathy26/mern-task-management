import React, { useState, useMemo, useEffect } from 'react';
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
  UserCircle,
  Loader2,
  ShieldCheck,
  CreditCard,
  UserPlus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { taskApi, collaborationApi } from '../utils/api';

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
        task.priority?.toLowerCase() === 'high' ? 'bg-red-50 text-red-600' : 
        task.priority?.toLowerCase() === 'medium' ? 'bg-orange-50 text-orange-600' : 
        'bg-green-50 text-green-600'
      }`}>
        {task.priority || 'Medium'}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
        <Calendar className="w-3 h-3" />
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
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

const KanbanColumn = ({ title, tasks, onTaskClick, onAddTask, loading }) => (
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
        disabled={loading}
        className="w-full py-2 border-2 border-dashed border-zinc-200 rounded-xl text-zinc-400 hover:border-zinc-300 hover:text-zinc-500 transition-all text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Task
      </button>
    </div>
  </div>
);

const UserDropdown = ({ onProfileClick, onSettingsClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-2 z-[100]"
  >
    <div className="p-3 border-b border-zinc-50 mb-1">
      <p className="text-xs font-bold text-zinc-900">Vignesh Sarathy</p>
      <p className="text-[10px] text-zinc-400">admin@protocol.app</p>
    </div>
    <button onClick={onProfileClick} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-all">
      <UserCircle className="w-4 h-4" /> Profile
    </button>
    <button onClick={onSettingsClick} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-all">
      <Settings className="w-4 h-4" /> Settings
    </button>
    <div className="h-px bg-zinc-50 my-1" />
    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all">
      <LogOut className="w-4 h-4" /> Logout
    </button>
  </motion.div>
);

const SettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = [
    { icon: User, label: 'Account' },
    { icon: Bell, label: 'Notifications' },
    { icon: ShieldCheck, label: 'Security' },
    { icon: CreditCard, label: 'Billing' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl relative z-10 overflow-hidden">
        <div className="flex h-[550px]">
          <div className="w-56 bg-zinc-50 border-r border-zinc-100 p-6">
            <h2 className="font-bold text-lg mb-8 px-2">Settings</h2>
            <nav className="space-y-1">
              {tabs.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === item.label ? 'bg-white shadow-md text-blue-600' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.label ? 'text-blue-600' : 'text-zinc-400'}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-1 p-10 overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black mb-1">{activeTab} Settings</h3>
                <p className="text-xs text-zinc-400 font-semibold tracking-wide uppercase">Manage your platform preferences and data.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-all group">
                <X className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900" />
              </button>
            </div>

            {activeTab === 'Account' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Display Name</label>
                  <input defaultValue="Vignesh Sarathy" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Email Address</label>
                  <input defaultValue="admin@protocol.app" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Role</label>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-blue-600 inline-block">System Administrator</div>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {[ 'Email Notifications', 'Desktop Alerts', 'Task Assignments', 'Team Comments' ].map((label, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-sm font-bold text-zinc-700">{label}</span>
                    <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-bold text-blue-900">Two-Factor Authentication</p>
                    <p className="text-xs text-blue-700">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-zinc-200 rounded-2xl text-xs font-bold text-zinc-500 hover:border-zinc-300 transition-all">
                  Change Password
                </button>
              </div>
            )}

            {activeTab === 'Billing' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-6 bg-zinc-900 rounded-3xl text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-4">Current Plan</p>
                  <h4 className="text-2xl font-black mb-1">Enterprise Protocol</h4>
                  <p className="text-sm opacity-70 mb-6">$499 / month • Renews Oct 2026</p>
                  <button className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200 transition-all">Upgrade Plan</button>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-zinc-100 flex justify-end gap-3">
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-50 transition-all">Cancel</button>
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all shadow-blue-200">Save Changes</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TaskDetails = ({ task, onClose, onUpdate, onDelete }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [description, setDescription] = useState(task.description || '');
  const [collaborators, setCollaborators] = useState(['S', 'M']);

  useEffect(() => {
    if (task?._id) {
      setLoadingComments(true);
      collaborationApi.getComments(task._id)
        .then(res => setComments(res.data.data.comments || []))
        .catch(() => setComments([]))
        .finally(() => setLoadingComments(false));
    }
    setDescription(task.description || '');
  }, [task?._id, task.description]);

  if (!task) return null;

  const handleStatusChange = (e) => {
    onUpdate(task._id, { status: e.target.value });
  };

  const handleDescriptionBlur = () => {
    if (description !== task.description) {
      onUpdate(task._id, { description });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await collaborationApi.addComment(task._id, {
        content: newComment,
        userName: 'Vignesh S.'
      });
      setComments([res.data.data.comment, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 w-[450px] bg-white h-screen shadow-2xl border-l border-zinc-200 z-[100] flex flex-col"
    >
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
          <X className="w-5 h-5 text-zinc-400" />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => onDelete(task._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400">
            <Trash2 className="w-5 h-5" />
          </button>
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
            <select 
              value={task.priority} 
              onChange={(e) => onUpdate(task._id, { priority: e.target.value })}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs font-bold uppercase focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Due Date</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
              <Calendar className="w-4 h-4 text-zinc-400" />
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Status</p>
          <select 
            value={task.status} 
            onChange={handleStatusChange}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Description</p>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            placeholder="Update the message or context for this task..."
            className="w-full bg-zinc-50 rounded-xl p-4 text-sm text-zinc-600 min-h-[120px] border border-zinc-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/10 resize-none"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Collaborators</p>
            <button 
              onClick={() => {
                const name = prompt('Collaborator initial:');
                if (name) setCollaborators([...collaborators, name.toUpperCase().slice(0, 1)]);
              }}
              className="text-blue-600 hover:text-blue-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"
            >
              <UserPlus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {collaborators.map((c, i) => (
              <div key={i} className="group relative">
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600 border border-zinc-200 shadow-sm">
                  {c}
                </div>
                <button 
                  onClick={() => setCollaborators(collaborators.filter((_, idx) => idx !== i))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-4 tracking-widest">Collaboration Chat</p>
          <div className="space-y-6">
            {loadingComments && <Loader2 className="w-5 h-5 animate-spin text-blue-600 mx-auto" />}
            {comments.map((comment, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm bg-blue-100 text-blue-600`}>
                  {comment.userName?.[0] || 'U'}
                </div>
                <div className="flex-1 bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-zinc-800">{comment.userName}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-100">
        <div className="relative">
          <input 
            value={newComment} onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder="Write a message..." 
            className="w-full bg-zinc-50 border-zinc-200 border rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          <button onClick={handleAddComment} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white shadow-lg shadow-blue-200 rounded-lg hover:bg-blue-700 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('Inbox');
  const [activeProject, setActiveProject] = useState('Product Launch Q3');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('kanban');
  const [loading, setLoading] = useState(true);
  const [creatingTask, setCreatingTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await taskApi.getAll();
      setTasks(res.data.data.tasks || []);
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (columnTitle) => {
    const title = prompt('Enter task title:');
    if (!title) return;
    const statusMap = { 'Backlog': 'backlog', 'To Do': 'todo', 'In Progress': 'in-progress', 'Done': 'done' };
    try {
      setCreatingTask(true);
      const res = await taskApi.create({ title, status: statusMap[columnTitle] || 'todo', priority: 'medium', dueDate: new Date(Date.now() + 86400000 * 3).toISOString() });
      setTasks(prev => [...prev, res.data.data.task]);
    } catch (err) {
      console.error('Failed to create task', err);
      alert('Failed to create task. Please try again.');
    } finally {
      setCreatingTask(false);
    }
  };

  const handleUpdateTask = async (id, data) => {
    try {
      const res = await taskApi.update(id, data);
      setTasks(prev => prev.map(t => t._id === id ? res.data.data.task : t));
      if (selectedTask?._id === id) setSelectedTask(res.data.data.task);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskApi.delete(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      setSelectedTask(null);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const groupedTasks = useMemo(() => {
    const groups = { 'Backlog': [], 'To Do': [], 'In Progress': [], 'Done': [] };
    const reverseStatusMap = { 'backlog': 'Backlog', 'todo': 'To Do', 'in-progress': 'In Progress', 'done': 'Done' };
    tasks.forEach(task => {
      const col = reverseStatusMap[task.status] || 'To Do';
      const matchesSearch = !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (matchesSearch) groups[col].push(task);
    });
    return groups;
  }, [tasks, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-['Inter'] selection:bg-blue-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} activeProject={activeProject} setActiveProject={setActiveProject} />
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => handleAddTask('To Do')} disabled={creatingTask} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:opacity-50">
                {creatingTask ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} New Task
              </button>
              <div className="flex bg-zinc-100 p-1 rounded-xl shadow-inner border border-zinc-200/50">
                { [ { i: Layout, v: 'kanban' }, { i: BarChart3, v: 'list' }, { i: Calendar, v: 'calendar' } ].map(v => (
                  <button key={v.v} onClick={() => setActiveView(v.v)} className={`p-1.5 rounded-lg transition-all ${activeView === v.v ? 'bg-white shadow-sm text-blue-600' : 'text-zinc-400'}`}> <v.i className="w-4 h-4" /> </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? 'text-blue-600' : 'text-zinc-400 group-focus-within:text-blue-600'}`} />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tasks..." className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-400" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => { setNotificationsOpen(!notificationsOpen); setUserMenuOpen(false); }} className={`p-2.5 transition-all relative rounded-xl hover:bg-zinc-100 ${notificationsOpen ? 'bg-zinc-100 text-blue-600' : 'text-zinc-400'}`}>
                  <Bell className="w-5 h-5" /> <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <AnimatePresence>{notificationsOpen && <NotificationDropdown />}</AnimatePresence>
              </div>
              <div className="relative">
                <div onClick={() => { setUserMenuOpen(!userMenuOpen); setNotificationsOpen(false); }} className={`w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border-2 transition-all cursor-pointer hover:shadow-md ${userMenuOpen ? 'border-blue-500 shadow-lg' : 'border-zinc-100'}`}>
                  <User className={`w-5 h-5 ${userMenuOpen ? 'text-blue-600' : 'text-zinc-500'}`} />
                </div>
                <AnimatePresence> {userMenuOpen && ( <UserDropdown onProfileClick={() => { setSettingsModalOpen(true); setUserMenuOpen(false); }} onSettingsClick={() => { setSettingsModalOpen(true); setUserMenuOpen(false); }} /> )} </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-black tracking-tight text-zinc-900">{activeProject}</h1>
                <div className="flex -space-x-3">
                  {['S', 'M', 'J', 'C'].map((m, i) => ( <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-100 flex items-center justify-center text-xs font-black shadow-sm cursor-pointer hover:y--1 transition-all"> {m} </div> ))}
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-zinc-50 flex items-center justify-center text-[10px] font-black text-zinc-400"> +2 </div>
                </div>
              </div>
              <p className="text-sm text-zinc-400 font-semibold tracking-wide uppercase"> {tasks.length} Total Tasks • <span className="text-blue-600">{activeTab} View</span> </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 text-blue-600 rounded-2xl text-xs font-black border border-blue-100"> <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Live Cloud Sync </div>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-400"> <Loader2 className="w-10 h-10 animate-spin mb-4" /> <p className="font-medium">Initializing workspace...</p> </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
              {Object.entries(groupedTasks).map(([title, columnTasks], i) => (
                <KanbanColumn key={i} title={title} tasks={columnTasks} onTaskClick={(task) => setSelectedTask(task)} onAddTask={handleAddTask} loading={creatingTask} />
              ))}
            </div>
          )}
        </div>
      </main>
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTask(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]" />
            <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence> {settingsModalOpen && ( <SettingsModal onClose={() => setSettingsModalOpen(false)} /> )} </AnimatePresence>
    </div>
  );
};

export default Dashboard;
