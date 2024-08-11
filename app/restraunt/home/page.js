"use client";
import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useUserAuth } from "@/services/utils";
import { db } from "@/app/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { getRestaurantMenuByOwner } from "@/services/GetRequest/getRequest";
import { useRouter } from "next/navigation";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { ref, getStorage, deleteObject } from "firebase/storage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import Link from "next/link";

export default function SettingsRestaurant() {
  const { user } = useUserAuth();
  const [menuData, setMenuData] = useState([]);
  const route = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  //get restaurant menu data
  async function fetchRestaurantMenu() {
    getRestaurantMenuByOwner((data) => {
      console.log("Data: ", data);
      console.log("user: ", user);
      setMenuData(data);
    }, user);
  }
  useEffect(() => {
    console.log("menuData: ", menuData);
  }, [menuData]);

  useEffect(() => {
    if (user) {
      fetchRestaurantMenu();
    }
  }, [user]);

  useEffect(() => {
    if (user == false) {
      route.push("/");
    }
  }, [user]);

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleProductDelete = async (productId, restaurantId, imageName) => {
    await deleteDoc(
      doc(db, "restaurants", restaurantId, "menu", productId)
    ).then(async () => {
      const storage = getStorage();
      console.log("imageName: ", imageName);
      const folderRef = ref(storage, `menu/${user}/${imageName}`);
      console.log("folderRef: ", folderRef);

      await deleteObject(folderRef).then(() => {
        setMenuData((prevMenuData) =>
          prevMenuData.filter((product) => product.id !== productId)
        );
      });
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: ({ cell: { value }, row: { original } }) => (
          <Image
            alt={`Product image - ${original.name}`}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={original.imageUrl}
            width="64"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => <Badge variant="outline">{value ? "Available":"Sold"}</Badge>,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ cell: { value } }) => `$${value}`,
        className: "hidden md:table-cell",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => {
          if (value && value.toDate) {
            return `${value.toDate().toDateString()}`;
          } else {
            return "Loading...";
          }
        },
        className: "hidden md:table-cell",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleProductEdit(original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() =>
                  handleProductDelete(
                    original.id,
                    original.restaurantId,
                    original.imageName
                  )
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [menuData]
  );

  const data = React.useMemo(() => menuData, [menuData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [globalFilter, setTableGlobalFilter]);

  return (
    <div>
      {menuData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <h3 className="text-2xl font-bold tracking-tight text-primary">
            You have no products
          </h3>
          <p className="text-sm text-gray-500">
            You can start selling as soon as you add a product.
          </p>
          <Link href="/restraunt/AddMenu" className="mt-4">
            <Button className="bg-primary">Add Product</Button>
          </Link>
        </div>
      ) : (
        <>
          <Input
            placeholder="Filter products"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm mb-4"
          />
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table {...getTableProps()}>
                <TableHeader>
                  {headerGroups.map((headerGroup) => (
                    <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <TableHead
                        key={column.id}
                          {...column.getHeaderProps()}
                          className={column.className}
                        >
                          {column.render("Header")}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <TableRow key={row} {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell}
                            {...cell.getCellProps()}
                            className={cell.column.className}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{menuData.length}</strong> of{" "}
                <strong>{menuData.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
