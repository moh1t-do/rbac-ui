import { useState, useEffect } from "react";
import { FiUser, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import mockusers from "../../assets/mockUsers.json";

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
  const [filterUsers, setFilterUsers] = useState<IUser[]>();
  const [search, setsearch] = useState<string>("");
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  }

  const handleFilter = () => {
    const fuser = users?.filter(({ email }) => email.includes(search));
    setCurrentPage(1);
    setFilterUsers(fuser);
  };

  useEffect(() => {
    const timerid = setTimeout(handleFilter, 500);
    return () => clearTimeout(timerid);
  }, [search]);

  useEffect(() => {
    setTotalUsers(mockusers.length);
    const tuser = mockusers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    setUsers(tuser);
    setTotalUsers(mockusers.length)
  }, [currentPage]);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 w-full overflow-x-auto">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> User Management
        </h3>
      </div>
      <div>
        <input className="mb-4 text-sm outline outline-[0.5px] px-2 py-1 rounded-sm outline-slate-400" placeholder="Search" onInput={handleSearch}></input>
      </div>
      <hr className="mb-4" />
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {
            (filterUsers || users)?.map((user, index) => (
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
  const [open, setOpen] = useState(false);
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        {email}
      </td>
      <td className="p-1.5">{firstName}</td>
      <td className="p-1.5">{lastName}</td>
      <td className="p-1.5">{role}</td>
      <td className="w-10">
        <div className="flex items-center justify-between">
          <button className="rounded-l px-2 text-left py-1.5 w-full text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
            onClick={() => {
              setOpen(!open);
            }}>
            Modify
          </button>
          <button className="rounded-r px-2 text-left py-1.5 w-full text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};