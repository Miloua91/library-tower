"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Search from "@/components/Search";
const bwipjs = require("bwip-js");
const { v4: uuidv4 } = require("uuid");
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [user, setUser] = useState("");
  const [opened, setOpened] = useState(false);
  const [bookworm, setBookworm] = useState("Join");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpened(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function Sub(event: React.FormEvent<HTMLFormElement>) {
    const uid = uuidv4();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    setCookie("bookworm", username, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    setCookie("id", uid, { maxAge: 365 * 24 * 60 * 60 * 1000 });

    try {
      const response = await fetch("/api/bookworm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, id: uid }),
      });

      const res = await response.json();

      const resLog = await fetch("/api/2fa");
      const worm = await resLog.json();

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
        setCookie("userIn", true, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        const secret = worm.data[0]?.secret;
        const uri = worm.data[0]?.uri;
        setCookie("secret", secret, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        setCookie("uri", uri, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while submitting the form.");
    }
  }

  async function Login() {
    setCookie("bookworm", user, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    setCookie("otp", value);
    const response = await fetch("/api/login");
    const worm = await response.json();

    if (user === "") return toast.info("Please enter your username to login.");
    if (value === "") return toast.info("Please enter your OTP to login.");
    if (worm.err) return toast.warning("You entered a wrong OTP.");
    if (worm.expired) return toast.warning("The OTP you entered has expired.");

    if (worm.data.length !== 0) {
      const id = worm.data[0]?.id;
      const secret = worm.data[0]?.secret;
      const uri = worm.data[0]?.uri;
      setCookie("userIn", true, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      setCookie("secret", secret, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      setCookie("uri", uri, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      setCookie("loggedIn", id, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      setCookie("id", id, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      toast.success("Welcome back!");
      setBookworm(`${user}`);
      router.replace("/");
    } else if (user.length === 0) {
      toast.error("Please enter a username.");
    } else {
      toast.error("This user doesn't exist.");
    }
  }

  const loggedIn = getCookie("loggedIn", { maxAge: 365 * 24 * 60 * 60 * 1000 });
  const userId = getCookie("id", { maxAge: 365 * 24 * 60 * 60 * 1000 });
  const name = getCookie("bookworm", { maxAge: 365 * 24 * 60 * 60 * 1000 });
  const uri = getCookie("uri", { maxAge: 365 * 24 * 60 * 60 * 1000 });
  const secret = getCookie("secret", { maxAge: 365 * 24 * 60 * 60 * 1000 });
  const userIn = getCookie("userIn", { maxAge: 365 * 24 * 60 * 60 * 1000 });

  useEffect(() => {
    setBookworm(`${name}`);
  }, [loggedIn, userId, name]);

  function Logout() {
    deleteCookie("id");
    deleteCookie("bookworm");
    deleteCookie("loggedIn");
    deleteCookie("secret");
    deleteCookie("uri");
    deleteCookie("userIn");
    setBookworm(`Join`);
    setUser("");
    setValue("");
    router.replace("/");
  }

  function CopyToClip() {
    navigator.clipboard.writeText(`${secret}`);
    toast.info("Code copied to clipboard");
  }

  useEffect(() => {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "qrcode", // Barcode type
        text: `${uri}`, // Text to encode
        scale: 5, // 3x scaling factor
        height: 24, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      });
    } catch (e) {
      // `e` may be a string or Error object
    }
    setDialogOpen(false);
  }, [dialogOpen, loggedIn, userId, uri, userIn]);

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
            <Link
              className="text-black hover:text-gray-600"
              href="/library?shelf=1"
            >
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
                  {(loggedIn || userId) && userIn ? (
                    `${bookworm}`
                  ) : (
                    <div className="h-7 bg-white hover:bg-yellow-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow">
                      Join
                    </div>
                  )}
                </DialogTrigger>
                {(loggedIn || userId) && userIn ? (
                  <DialogContent>
                    <DialogTitle className="text-xl flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="gap-1 flex items-center">
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
                      <div className="flex flex-col mx-4 space-y-2">
                        <p className="text-lg font-light">
                          Scan the QR code below using a supported authenticator
                          app to login next time.
                        </p>
                        <canvas
                          className="w-[140px] h-[140px] m-auto border p-2 rounded"
                          id="mycanvas"
                        ></canvas>
                        <p className="text-lg font-light w-full">
                          Can&apos;t scan the QR code? Enter this code into your
                          authenticator app instead:{" "}
                          <span className="text-sm font-semibold sm:mx-4 flex justify-evenly sm:inline-flex break-all text-left">
                            {secret}
                            <ClipboardDocumentIcon
                              onClick={() => CopyToClip()}
                              className="w-5 inline-block mb-2 sm:ml-4 cursor-pointer"
                            />
                          </span>
                        </p>
                      </div>
                      <DialogClose
                        className="h-10 bg-white hover:bg-yellow-100 text-gray-800 font-semibold px-4 mt-2 border border-gray-400 rounded shadow"
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
                    <div className="flex flex-col sm:flex-row gap-4 justify-between flex-wrap m-auto sm:m-0">
                      <div className="flex flex-col gap-1">
                        <InputOTP
                          maxLength={6}
                          value={value}
                          onChange={(value) => setValue(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <div className="text-sm">
                          {value === "" ? (
                            <>Enter your one-time password to login.</>
                          ) : (
                            <>You entered: {value}</>
                          )}
                        </div>
                      </div>
                      <DialogClose
                        className="h-10 bg-white m-auto w-full sm:w-auto sm:m-0 hover:bg-yellow-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        type="submit"
                        onClick={() => Login()}
                      >
                        Login
                      </DialogClose>
                    </div>
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
      <div
        className={`flex justify-evenly transform transition-all ${
          !opened
            ? "-translate-y-4 opacity-0 ease-out pointer-events-none -mb-10"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Link href="/library?shelf=1" className="text-xl text-black block py-2">
          Library
        </Link>
        <Link href="/shelf" className="text-xl text-black block py-2">
          Shelf
        </Link>
      </div>
      <hr
        className={`border-gray-950 border-t-2 flex justify-evenly transform transition-all ${
          !opened
            ? "-translate-y-2 delay-75 opacity-0 ease-out pointer-events-none -mb-4"
            : "translate-y-0 opacity-100"
        }`}
      />
    </div>
  );
}
