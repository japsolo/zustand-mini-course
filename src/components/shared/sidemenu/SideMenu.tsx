import type { IconType } from "react-icons";
import {
	IoAccessibilityOutline,
	IoHeartOutline,
	IoListOutline,
	IoLogOutOutline,
	IoPawOutline,
	IoSpeedometerOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { SideMenuItem } from "./SideMenuItem";

interface MenuItem {
	title: string;
	subTitle: string;
	href: string;
	Icon: IconType;
}

const menuItems: MenuItem[] = [
	{
		title: "Dashboard",
		subTitle: "Visualizar data",
		href: "/dashboard",
		Icon: IoSpeedometerOutline,
	},
	{
		title: "Osos",
		subTitle: "Manejador de osos",
		href: "/dashboard/bears",
		Icon: IoPawOutline,
	},
	{
		title: "Persona",
		subTitle: "Nombre y apellido",
		href: "/dashboard/person",
		Icon: IoAccessibilityOutline,
	},
	{
		title: "Tareas",
		subTitle: "Listado de tareas",
		href: "/dashboard/tasks",
		Icon: IoListOutline,
	},
	{
		title: "Boda",
		subTitle: "Invitados a la boda",
		href: "/dashboard/wedding-invitation",
		Icon: IoHeartOutline,
	},
];

export const SideMenu = () => {
	return (
		<div id="menu" className="overflow-y-scroll left-0 z-10 w-80 min-h-screen bg-gray-900 text-slate-300">
			<div id="logo" className="px-6 my-4">
				{/* Title */}
				<h1 className="text-lg font-bold text-white md:text-2xl">
					Zustand
					<span className="text-xs text-blue-500"> StateManager</span>.
				</h1>
				<p className="text-sm text-slate-500">Manejador de estados simple pero poderoso.</p>
			</div>

			{/*  Profile */}
			<div id="profile" className="px-6 py-10">
				<p className="text-slate-500">Bienvenido,</p>
				<a href="/" className="inline-flex items-center space-x-2">
					<span>
						<img
							className="w-8 h-8 rounded-full"
							src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
							alt=""
						/>
					</span>
					<span className="text-sm font-bold md:text-base">Edward Tompson</span>
				</a>
			</div>

			{/* Menu Items */}
			<nav id="nav" className="px-6 w-full">
				{menuItems.map((item) => (
					<SideMenuItem key={item.href} {...item} />
				))}

				{/* Logout */}
				<NavLink to={"/auth/login"} className="mt-10">
					<div>
						<IoLogOutOutline />
					</div>
					<div className="flex flex-col">
						<span className="text-lg font-bold leading-5 text-slate-300">Logout</span>
						<span className="hidden text-sm text-slate-500 md:block">Cerrar sesión</span>
					</div>
				</NavLink>
			</nav>
		</div>
	);
};
