export const StatCards = () => {
  return (
    <>
      <Card
        title="Total Users"
        value="20"
      />
      <Card
        title="Total Roles"
        value="3"
      />
    </>
  );
};

const Card = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="col-span-6 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};
