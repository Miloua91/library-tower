"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Search from "@/components/Search";
const bwipjs = require("bwip-js");
const { v4: uuidv4 } = require("uuid");

export default function Header() {
  const [user, setUser] = useState("");
  const [opened, setOpened] = useState(false);
  const [bookworm, setBookworm] = useState("Join");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  
  function handleJoin() {
    setDialogOpen(true);
  }

  async function Sub(event: React.FormEvent<HTMLFormElement>) {
    const uid = uuidv4();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    setCookie("bookworm", username, {maxAge: 365 * 24 * 60 * 60 * 1000});
    setCookie("id", uid, {maxAge: 365 * 24 * 60 * 60 * 1000});

    try {
      const response = await fetch("/api/bookworm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, id: uid }),
      });

      const res = await response.json();

      if (res.error) {
        const duplicate = res.error.code || "";

        if (duplicate === "23505") {
          toast.info("This username already exists.");
        } else {
          toast.warning("Please enter a username.");
        }
      } else {
        toast.success("Welcome to library tower!");
        setBookworm(`${username}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while submitting the form.");
    }
  }

  async function Login() {
    setCookie("bookworm", user, {maxAge: 365 * 24 * 60 * 60 * 1000});
    const response = await fetch("/api/login");
    const worm = await response.json();

    if (worm.data.length !== 0) {
      const id = worm.data[0].id;
      setCookie("loggedIn", id, {maxAge: 365 * 24 * 60 * 60 * 1000});
      setCookie("id", id, {maxAge: 365 * 24 * 60 * 60 * 1000});
      toast.success("Welcome back!");
      setBookworm(`${user}`);
      router.replace("/");
    } else if (user.length === 0) {
      toast.error("Please enter a username.");
    } else {
      toast.error("This user doesn't exist.");
    }
  }

  const loggedIn = getCookie("loggedIn", {maxAge: 365 * 24 * 60 * 60 * 1000});
  const userId = getCookie("id", {maxAge: 365 * 24 * 60 * 60 * 1000});
  const name = getCookie("bookworm", {maxAge: 365 * 24 * 60 * 60 * 1000});

  useEffect(() => {
    setBookworm(`${name}`);
  }, [loggedIn, userId, name]);

  function Logout() {
    deleteCookie("id");
    deleteCookie("bookworm");
    deleteCookie("loggedIn");
    setBookworm(`Join`);
    setUser("");
    router.replace("/");
  }

  useEffect(() => {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "codablockf", // Barcode type
        text: `${loggedIn}`, // Text to encode
        scale: 2, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      });
    } catch (e) {
      // `e` may be a string or Error object
    }
    setDialogOpen(false);
  }, [dialogOpen, loggedIn, userId]);

  return (
    <div className="mx-2 md:mx-12">
      <div className="relative bg-white">
        <div className="flex justify-between items-center">
          <div className="lg:hidden">
            <Link href="/" className="text-5xl">
              <Image
                src="/icon.svg"
                alt="LT"
                className="my-1"
                width={48}
                height={48}
                priority
              />
            </Link>
          </div>
          <div className="hidden lg:flex gap-10 text-xl text-gray-600 items-center">
            <div>
              <Link href="/" className="text-5xl hover:opacity-80">
                <Image
                  src="/icon.svg"
                  alt="LT"
                  className="my-1"
                  width={48}
                  height={48}
                  priority
                />
              </Link>
            </div>
            <Link className="text-black hover:text-gray-600" href="/library?shelf=1">
              Library
            </Link>
            <Link className="text-black hover:text-gray-600" href="/shelf">
              Shelf
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Dialog>
                <DialogTrigger>
                  <input
                    className="border h-7 px-2 rounded text-gl w-[5em] transition-all duration-300 mr-1 outline-none"
                    type="text"
                    placeholder="Search"
                  />
                </DialogTrigger>
                <DialogContent>
                  <Search />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger onClick={() => setDialogOpen(true)}>
                  {loggedIn || userId ? (
                    `${bookworm}`
                  ) : (
                    <div className="h-7 bg-white hover:bg-yellow-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow">
                      Join
                    </div>
                  )}
                </DialogTrigger>
                {loggedIn || userId ? (
                  <DialogContent>
                    <DialogTitle className="text-xl flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Image
                            src="/icon.svg"
                            alt="LT"
                            width={48}
                            height={48}
                            priority
                          />
                          <label>Library Tower</label>
                        </div>
                        <p>{bookworm}</p>
                      </div>
                      <div className="flex justify-center my-4">
                        <canvas id="mycanvas"></canvas>
                      </div>
                      <DialogClose
                        className="ht-10 bg-white hover:bg-yellow-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={() => Logout()}
                      >
                        Logout
                      </DialogClose>
                    </DialogTitle>
                  </DialogContent>
                ) : (
                  <DialogContent>
                    <DialogTitle>
                      <label>
                        Join library tower to add books to your shelf
                      </label>
                    </DialogTitle>
                    <form onSubmit={Sub} className="flex border rounded">
                      <input
                        className="h-10 border outline-gray-400 px-4 text-xl w-full"
                        type="text"
                        name="username"
                        placeholder="type a username"
                        onChange={(e) => setUser(e.target.value)}
                        required
                      />
                      <button
                        className="h-10 bg-white hover:bg-yellow-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        type="submit"
                      >
                        Join
                      </button>
                    </form>
                    <label>Already registred?</label>
                    <button
                      className="bg-white hover:bg-yellow-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      type="submit"
                      onClick={() => Login()}
                    >
                      Login
                    </button>
                  </DialogContent>
                )}
              </Dialog>
            </div>
            <div
              onClick={() => (opened ? setOpened(false) : setOpened(true))}
              className={classNames(`tham tham-e-spin tham-w-6 lg:hidden`, {
                "tham-active": opened,
              })}
            >
              <div className="tham-box">
                <div className="tham-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="relative border-gray-950 border-t-2 top-[2px]" />
      {opened && (
        <div className="flex justify-evenly lg:hidden">
          <Link href="/library?shelf=1" className="text-xl text-black block py-2">
            Library
          </Link>
          <Link href="/shelf" className="text-xl text-black block py-2">
            Shelf
          </Link>
        </div>
      )}
      <hr className="border-gray-950 border-t-2" />
    </div>
  );
}
