import { useState, useEffect } from "react";
import { FiServer, FiArrowLeft, FiArrowRight, FiEdit, FiDelete, FiPlus } from "react-icons/fi";
import mockRoles from "../../assets/mockRoles.json";

export interface IRole {
    id: number;
    name: string;
    activeUsers: number;
    inactiveUsers: number;
    totalUsers: number;
}

interface TableRowProps extends Omit<IRole, 'id'> {
    order: number;
}

export const RoleTable = () => {
    const [roles, setRoles] = useState<IRole[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRolesPerPage] = useState<number>(5);
    const [totalRoles, setTotalRoles] = useState<number>(0);

    const handleNextPage = () => {
        if (currentPage === Math.ceil(totalRoles / totalRolesPerPage)) {
            return;
        };
        setCurrentPage(currentPage + 1);
    }

    const handlePreviousPage = () => {
        if (currentPage === 1) {
            return;
        };
        return setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        setTotalRoles(mockRoles.length);
        const troles = mockRoles.slice((currentPage - 1) * totalRolesPerPage, currentPage * totalRolesPerPage);
        setRoles(troles);
        setTotalRoles(mockRoles.length)
    }, [currentPage]);

    return (
        <div className="col-span-12 p-4 rounded border border-stone-300 w-full">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiServer /> Role Management
                </h3>
                <button className="flex items-center justify-between rounded px-2 outline gap-2 outline-purple-500">
                    <FiPlus />
                    Add
                </button>
            </div>
            <hr className="mb-4" />
            <div className="overflow-x-scroll">
                <table className="w-full table-auto">
                    <TableHead />
                    <tbody>
                        {
                            roles?.map((role, index) => (
                                <TableRow
                                    key={role.id}
                                    name={role.name}
                                    activeUsers={role.activeUsers}
                                    inactiveUsers={role.inactiveUsers}
                                    totalUsers={role.totalUsers}
                                    order={index}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="flex items-center justify-between grid-rows-1 px-1 py-2">
                <p className="text-sm text-black">{`Showing ${(currentPage - 1) * totalRolesPerPage + 1} to ${Math.min((currentPage - 1) * totalRolesPerPage + totalRoles, totalRoles)} of ${totalRoles} results`}</p>
                <div className="flex items-center justify-between gap-2">
                    <button className="text-sm text-violet-500 hover:underline outline outline-stone-300 outline-[0.5px] rounded-sm p-1" onClick={handlePreviousPage}><FiArrowLeft size={20} /></button>
                    <button className="text-sm text-violet-500 hover:underline outline outline-stone-300 outline-[0.5px] rounded-sm p-1" onClick={handleNextPage}><FiArrowRight size={20} /></button>
                </div>
            </div>
        </div>
    );
};

const TableHead = () => {
    return (
        <thead>
            <tr className="text-sm font-normal text-stone-500">
                <th className="text-start p-1.5">Name</th>
                <th className="text-start p-1.5">Active Users</th>
                <th className="text-start p-1.5">Inactive Users</th>
                <th className="text-start p-1.5">Total Users</th>
                <th className="text-start p-1.5">Actions</th>
            </tr>
        </thead>
    );
};

const TableRow = ({
    name,
    activeUsers,
    inactiveUsers,
    totalUsers,
    order,
}: TableRowProps) => {
    return (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
            <td className="p-1.5">
                {name}
            </td>
            <td className="p-1.5">{activeUsers}</td>
            <td className="p-1.5">{inactiveUsers}</td>
            <td className="p-1.5">{totalUsers}</td>
            <td className="w-totalRolesPerPage">
                <div className="flex items-center justify-start gap-2 px-2">
                    <button className="text-purple-500">
                        <FiEdit size={20} />
                    </button>
                    <button className="text-red-500">
                        <FiDelete size={20} />
                    </button>
                </div>
            </td>
        </tr>
    );
};