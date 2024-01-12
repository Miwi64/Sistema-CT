import { Student, columns } from "@/lib/columns";
import { DataTable } from "../components/ui/data-table";
import { useEffect, useState } from "react";
import { NavMenu } from "@/components/nav-menu";

export default function StudentsTable() {
  const [data, setData] = useState({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });

  useEffect(() => {
    const loadStudents = async () => {
      //const res = getAllStudents()
      const res = await fetch(
        "http://localhost:8000/data/api/v1/alumnos/?limit=1000",
        {
          method: "GET",
          headers: {
            Authorization:
              "Token " +
              "6dd27b969b34980db23ce78c110353dc2dc46ab7df8915ebf3b39fe2f48eae61",
          },
        }
      );

      const object = await res.json();
      console.log(object.results);
      setData(object);
    };
    loadStudents();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.results} />
    </div>
  );
}
