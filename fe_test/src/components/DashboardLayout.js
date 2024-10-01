'use client'
import * as React from 'react';
import { useRouter } from "next/navigation";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Dashboard from './Dashboard'
import Lalin from './Lalin'
import Master from './Master'

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'lalin',
    title: 'Laporan Lalin',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'hari',
        title: 'Laporan Per Hari',
        icon: <DescriptionIcon />,
      }
    ],
  },
  {
    segment: 'master',
    title: 'Master Gerbang',
    icon: <SettingsIcon />,
  },
];

export default function DashboardLayoutTemplate() {
  const routerNext = useRouter()
  const [pathname, setPathname] = React.useState('/dashboard');
  const [session, setSession] = React.useState({
    user: {
      name: 'Super Admin',
      email: 'SuperAdmin@gmail.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Super Admin',
            email: 'SuperAdmin@gmail.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem("isLoggedIn");
        routerNext.push("/");
      },
    };
  }, []);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <img src="image/jasamargalogo.png" alt="MUI logo" />,
        title: '',
      }}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>
        {
          pathname === '/dashboard' && <Dashboard />
        }
        {
          pathname === '/lalin/hari' && <Lalin />
        }
        {
          pathname === '/master' && <Master />
        }
      </DashboardLayout>
    </AppProvider>
  );
}
