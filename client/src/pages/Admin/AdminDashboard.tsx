import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { LogOut, CheckCircle, Clock, XCircle, Zap } from 'lucide-react';
import type { Booking } from '@/shared/schemas-client';

interface DashboardStats {
  total: number;
  pending: number;
  confirmed: number;
  rejected: number;
  completed: number;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const { toast } = useToast();
  const [, navigate] = useLocation();
  // default to showing recent bookings when admin opens dashboard
  const [selectedStatus, setSelectedStatus] = useState<'recent' | 'total' | 'pending' | 'confirmed' | 'rejected' | 'completed'>('recent');

  useEffect(() => {
    const admin = localStorage.getItem('adminToken');
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    try {
      const adminData = JSON.parse(admin);
      setAdminEmail(adminData.email);
    } catch {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }

    loadBookings();
  }, [navigate]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest('GET', '/api/admin/bookings');
      const result = await response.json();

      if (result.success) {
        setBookings(result.bookings);
        setStats(result.stats);
      }
    } catch (error: any) {
      toast({
        title: '❌ Error',
        description: 'Failed to load bookings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await apiRequest(
        'PUT',
        `/api/admin/bookings/${bookingId}/status`,
        { status: newStatus }
      );
      const result = await response.json();

      if (result.success) {
        toast({
          title: '✅ Success',
          description: `Booking status updated to ${newStatus}`,
        });
        loadBookings();
        setSelectedStatus('recent');
      }
    } catch (error: any) {
      toast({
        title: '❌ Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: '✅ Logged Out',
      description: 'You have been logged out successfully',
    });
    navigate('/admin/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatIcon = (key: string) => {
    switch (key) {
      case 'total':
        return <Zap className="w-6 h-6" />;
      case 'pending':
        return <Clock className="w-6 h-6" />;
      case 'confirmed':
        return <CheckCircle className="w-6 h-6" />;
      case 'rejected':
        return <XCircle className="w-6 h-6" />;
      case 'completed':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  // compute which bookings to show depending on selectedStatus
  const visibleBookings = (() => {
    if (!bookings || bookings.length === 0) return [] as Booking[];

    if (selectedStatus === 'recent') {
      // show the most recent 10 bookings
      return bookings
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
    }

    if (selectedStatus === 'total') return bookings;

    return bookings.filter((b) => b.status === selectedStatus);
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="text-3xl">🚕</div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Moonstone Admin</h1>
              <p className="text-sm text-slate-600">{adminEmail}</p>
            </div>
          </motion.div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {Object.entries(stats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedStatus(key === 'total' ? 'total' : (key as any))}
                className={`cursor-pointer bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  key === 'total'
                    ? 'border-purple-500'
                    : key === 'pending'
                      ? 'border-yellow-500'
                      : key === 'confirmed'
                        ? 'border-green-500'
                        : key === 'rejected'
                          ? 'border-red-500'
                          : 'border-blue-500'
                }`}
                style={selectedStatus === (key === 'total' ? 'total' : (key as any)) ? { transform: 'translateY(-6px)', boxShadow: '0 8px 30px rgba(2,6,23,0.08)' } : {}}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-semibold capitalize">
                      {key === 'total' ? 'Total Rides' : key}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      key === 'total'
                        ? 'bg-purple-100 text-purple-600'
                        : key === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : key === 'confirmed'
                            ? 'bg-green-100 text-green-600'
                            : key === 'rejected'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {getStatIcon(key)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {selectedStatus === 'recent'
                ? 'Recent Bookings'
                : selectedStatus === 'total'
                ? 'All Bookings'
                : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Bookings`}
            </h2>
            <div className="flex items-center gap-2">
              <Button size="sm" variant={selectedStatus === 'recent' ? undefined : 'ghost'} onClick={() => setSelectedStatus('recent')}>Recent</Button>
              <Button size="sm" variant={selectedStatus === 'total' ? undefined : 'ghost'} onClick={() => setSelectedStatus('total')}>All</Button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-600">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-slate-600">No bookings yet</div>
          ) : visibleBookings.length === 0 ? (
            <div className="p-8 text-center text-slate-600">No bookings match this filter</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900 font-mono">
                        {booking.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-semibold">
                        {booking.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div>{booking.phone}</div>
                        <div className="text-xs text-slate-500">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="truncate">📍 {booking.pickupLocation}</div>
                        <div className="text-xs text-slate-500 truncate">
                          → {booking.dropLocation}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div>{booking.startDate}</div>
                        <div className="text-xs text-slate-500">{booking.startTime}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2 flex-wrap">
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="bg-green-500 hover:bg-green-600 text-white text-xs"
                              >
                                ✓ Confirm
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(booking.id, 'rejected')}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs"
                              >
                                ✕ Reject
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(booking.id, 'completed')}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                            >
                              ✓ Complete
                            </Button>
                          )}
                          {(booking.status === 'completed' || booking.status === 'rejected') && (
                            <span className="text-xs text-slate-500 py-1">No actions</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
