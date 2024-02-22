import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { globalNavigation } from '../../app';

export default function SubNavigation() {
  const location = useLocation();
  const [tabs, setTabs] = useState<{ name: string; to: string; shouldRender: boolean; }[]>([]);

  useEffect(() => {
    const activeParent = globalNavigation.find(
      (nav) => nav.children?.some((child) => {
        const regexPattern = child.to.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${regexPattern}$`);

        return regex.test(location.pathname);
      })
    );

    if (!activeParent?.children) return;

    setTabs(activeParent.children.filter((tab) => tab.shouldRender !== false) || []);
  }, [location]);

  return (
    <div className="bg-zinc-900 mb-6">
      <div className="mx-auto">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-none bg-white/5 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
            // defaultValue={props.tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex border-b border-white/10 py-4">
            <ul
              className="flex min-w-full flex-none gap-x-6 px-2 text-sm font-semibold leading-6 text-zinc-400"
            >
              {tabs.map((tab) => (
                <li key={tab.name}>
                  <NavLink
                    to={tab.to}
                    className={({ isActive }) => (isActive ? 'text-yellow-600' : '')}
                  >
                    {tab.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
