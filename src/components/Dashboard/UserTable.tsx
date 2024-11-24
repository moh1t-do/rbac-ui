import { useState, useEffect } from "react";
import { FiUser, FiArrowLeft, FiArrowRight, FiEdit, FiDelete, FiUserPlus } from "react-icons/fi";
import mockusers from "../../assets/mockUsers.json";
import { Link } from "react-router";

interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface TableRowProps extends IUser {
  order: number;
}

export const UserTable = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const handleNextPage = () => {
    if (currentPage === Math.ceil(totalUsers / usersPerPage)) {
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
    setTotalUsers(mockusers.length);
    const tuser = mockusers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    setUsers(tuser);
    setTotalUsers(mockusers.length)
  }, [currentPage]);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> User Management
        </h3>
        <button className="flex items-center justify-between rounded px-2 outline gap-2 outline-purple-500">
          <FiUserPlus />
          Add
        </button>
      </div>
      <hr className="mb-4" />
      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <TableHead />
          <tbody>
            {
              (users)?.map((user, index) => (
                <TableRow
                  key={user.id}
                  id={user.id}
                  email={user.email}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  role={user.role}
                  order={index}
                />
              ))
            }
          </tbody>
        </table>
      </div>
      <hr />
      <div className="flex items-center justify-between grid-rows-1 px-1 py-2">
        <p className="text-sm text-black">{`Showing ${(currentPage - 1) * usersPerPage + 1} to ${Math.min((currentPage - 1) * usersPerPage + totalUsers, totalUsers)} of ${totalUsers} results`}</p>
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
        <th className="text-start p-1.5">Email</th>
        <th className="text-start p-1.5">First Name</th>
        <th className="text-start p-1.5">Last Name</th>
        <th className="text-start p-1.5">Role</th>
        <th className="text-start p-1.5">Actions</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  id,
  email,
  firstName,
  lastName,
  role,
  order,
}: TableRowProps) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <Link to={`mailto:${email}`} className="text-purple-700 underline">
          {email}
        </Link>
      </td>
      <td className="p-1.5">{firstName}</td>
      <td className="p-1.5">{lastName}</td>
      <td className="p-1.5">{role}</td>
      <td className="w-10">
        <div className="flex items-center justify-between">
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