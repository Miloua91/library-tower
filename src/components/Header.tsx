"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
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
} from "@/components/ui/dialog";
const bwipjs = require("bwip-js");
const { v4: uuidv4 } = require("uuid");

export default function Header() {
  const [user, setUser] = useState("");
  const [opened, setOpened] = useState(false);
  const [bookworm, setBookworm] = useState("Join");
  const [dialogOpen, setDialogOpen] = useState(false);

  async function Sub(event: React.FormEvent<HTMLFormElement>) {
    const uid = uuidv4();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    setCookie("bookworm", username);
    setCookie("id", uid);

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
    setCookie("bookworm", user);
    const response = await fetch("/api/login");
    const worm = await response.json();

    if (worm.data.length !== 0) {
      const id = worm.data[0].id;
      setCookie("loggedIn", id);
      setCookie("id", id);
      toast.success("Welcome back!");
      setBookworm(`${user}`);
    } else if (user.length === 0) {
      toast.error("Please enter a username.");
    } else {
      toast.error("This user doesn't exist.");
    }
  }

  const loggedIn = getCookie("loggedIn");
  const userId = getCookie("id");
  const name = getCookie("bookworm");

  useEffect(() => {
    setBookworm(`${name}`);
  }, [loggedIn, userId]);

  function Logout() {
    deleteCookie("id");
    deleteCookie("bookworm");
    deleteCookie("loggedIn");
    setBookworm(`Join`);
    setUser("");
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
              <Image src="/icon.svg" alt="LT" width={64} height={64} priority/>
            </Link>
          </div>
          <div className="hidden lg:flex gap-10 text-xl text-gray-600 items-center">
            <div>
              <Link href="/" className="text-5xl hover:opacity-80">
                <Image src="/icon.svg" alt="LT" width={64} height={64} priority/>
              </Link>
            </div>
            <Link className="text-black hover:text-gray-600" href="/library">
              Library
            </Link>
            <Link className="text-black hover:text-gray-600" href="/shelf">
              Shelf
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Dialog>
                <DialogTrigger>
                  <input
                    className="border h-6 px-2 rounded-full text-gl w-[5em] transition-all duration-300 mr-1 outline-none"
                    type="text"
                    placeholder="Search"
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Search Books!</DialogTitle>
                  <DialogDescription>
                    <input
                      className="h-10 px-4 rounded-full text-xl w-full transition-all duration-300 mr-1"
                      type="search"
                      name="search"
                      placeholder="Search"
                    />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger onClick={() => setDialogOpen(true)}>
                  {loggedIn || userId ? `${bookworm}` : "Join"}
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
                      <button
                        className="ht-10 bg-white hover:bg-yellow-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={() => Logout()}
                      >
                        Logout
                      </button>
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
      <hr className="border-gray-700" />
      {opened && (
        <div className="flex justify-evenly lg:hidden">
          <Link href="/library" className="text-xl text-black block py-2">
            Library
          </Link>
          <Link href="/shelf" className="text-xl text-black block py-2">
            Shelf
          </Link>
        </div>
      )}
      <hr className="border-gray-700" />
    </div>
  );
}
