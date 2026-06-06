"use client"
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGlobe, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


export const Navbar = ({
    changeLenguageText,
    projectAsteroid,
    contactAsteroid,
    aboutAsteroid,
    bussinessAsteroid,
    code }: {
        changeLenguageText: string,
        projectAsteroid: string,
        contactAsteroid: string,
        aboutAsteroid: string,
        bussinessAsteroid: string,
        code: string
    }) => {

    const [asteroidsMenuOpen, setAsteroidsMenuOpen] = useState(false);
    const [showLenguageMenu, setshowLenguageMenu] = useState(false);
    const [activeClass, setactiveClass] = useState(false);
    const navbar: any = useRef(null)

    const router = useRouter();
    const pathname = usePathname();

    let principalUbication = 0;
    const handleViewNav = () => {

        if (typeof window === 'undefined') return;
        if (asteroidsMenuOpen) return;
        if (window.scrollY < 0) {
            return;
        };

        let currentDisplacement = window.scrollY;
        if (currentDisplacement === principalUbication) return;


        if (currentDisplacement >= 1) {
            setactiveClass(true);
        } else {
            setactiveClass(false);
        };
        if (navbar.current !== null) {

            if (principalUbication >= currentDisplacement) {
                navbar.current.style.top = '0';
                navbar.current.style.transition = '.5s';
            } else {
                navbar.current.style.top = '-400px';
                navbar.current.style.transition = '1s';
            }

            principalUbication = currentDisplacement;

        };
    };

    useEffect(() => {

        document.addEventListener('scroll', handleViewNav);
        return () => {
            document.removeEventListener('scroll', handleViewNav);
        };

    }, []);


    const openAsteroidsMenu = () => {
        setAsteroidsMenuOpen(true);
    };

    const closeAsteroidsMenu = () => {
        setAsteroidsMenuOpen(false);
    };

    const clickOnAsteroid = (link: string) => {
        setAsteroidsMenuOpen(false);
        router.push(link);
    };

    const openLenguagesMenu = () => {
        setshowLenguageMenu(true);
    };

    const closeLenguagesMenu = () => {
        setshowLenguageMenu(false);
    };


    return (
        <>

            <nav ref={navbar} className={`${activeClass ? "bg-gradient-to-b from-black to-transparent" : ""} z-[998] fixed top-0 left-0 w-full flex justify-between items-center py-10 px-[15%]`}>

                <Image
                    src={require("@/assets/slogan.png")}
                    alt='Andres Bonilla Logo'
                    width={60}
                    height={60}
                />

                <div className='flex items-center'>

                    <button onClick={openLenguagesMenu} type='button' className='flex items-center mr-3 lg:mr-6 cursor-pointer hover:text-[#DFDFDF] transition-all duration-150'>
                        <FontAwesomeIcon icon={faGlobe} size='2x' className='text-white' />
                        <p className='text-white font-bold ml-3'>{code}</p>
                    </button>

                    <FontAwesomeIcon
                        onClick={openAsteroidsMenu}
                        icon={faBars}
                        className='text-white cursor-pointer hover:text-[#DFDFDF] transition-all duration-150'
                        size='2x'
                    />
                </div>

            </nav>

            {/* change the lenguage part */}
            {
                showLenguageMenu && <div className='flex justify-center items-center h-screen fixed w-full top-0 left-0 z-[999]'>
                    <div onClick={closeLenguagesMenu} className='cursor-pointer z-[1000] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50'></div>
                    <div className='bg-white py-10 px-12 rounded z-[1001]'>

                        <h2 className='font-bold text-xl mb-3'>{changeLenguageText}</h2>
                        <hr />

                        <div className='md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-3 mt-3'>
                            <Link href="/en" className={`text-black flex items-center ${pathname.startsWith('/en') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>English</p>
                            </Link>

                            <Link href="/es" className={`text-black flex items-center ${pathname.startsWith('/es') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>Español</p>
                            </Link>

                            <Link href="/ja" className={`text-black flex items-center ${pathname.startsWith('/ja') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>日本語</p>
                            </Link>

                            <Link href="/fr" className={`text-black flex items-center ${pathname.startsWith('/fr') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>Français</p>
                            </Link>

                            <Link href="/de" className={`text-black flex items-center ${pathname.startsWith('/de') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>Deutsch</p>
                            </Link>

                            <Link href="/zh" className={`text-black flex items-center ${pathname.startsWith('/zh') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>中文</p>
                            </Link>

                            <Link href="/hi" className={`text-black flex items-center ${pathname.startsWith('/hi') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>हिंदी</p>
                            </Link>

                            <Link href="/pt" className={`text-black flex items-center ${pathname.startsWith('/pt') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>Português</p>
                            </Link>

                            <Link href="/ru" className={`text-black flex items-center ${pathname.startsWith('/ru') ? 'bg-slate-300' : 'hover:bg-slate-300'} hover:transition-all px-1 py-3 rounded`}>
                                <p className='ml-2 text-xl'>Русский</p>
                            </Link>
                        </div>

                    </div>
                </div>

            }

            {
                asteroidsMenuOpen && <div className='fixed w-full h-screen z-[999] bg-[#0F193B]'>
                    <div className='stars'>
                        <div className='flex justify-end items-center p-10'>
                            <FontAwesomeIcon
                                onClick={closeAsteroidsMenu}
                                icon={faXmark}
                                className='text-white w-12 h-12 cursor-pointer'
                            />
                        </div>
                        <div className='overflow-hidden'>

                            <button
                                onClick={() => clickOnAsteroid("/#about")}
                                className='w-[7rem] h-[7rem] flex justify-center items-center mb-8 asteroid asteroid4'
                                id='asteroid1'
                            >
                                <p className='font-bold text-white text-2xl'>{aboutAsteroid}</p>
                            </button>

                            <button
                                onClick={() => clickOnAsteroid("/#business-part")}
                                className='w-[10rem] h-[10rem] flex justify-center items-center mb-12 asteroid asteroid1'
                                id='asteroid2'
                            >
                                <p className='font-bold text-white text-2xl'>{bussinessAsteroid}</p>
                            </button>

                            <button
                                onClick={() => clickOnAsteroid("/#projects")}
                                className='w-[10rem] h-[10rem] flex justify-center items-center mb-12 asteroid asteroid2'
                                id='asteroid3'
                            >
                                <p className='font-bold text-white text-2xl'>{projectAsteroid}</p>
                            </button>

                            <button
                                onClick={() => clickOnAsteroid("/#contact-form")}
                                className='w-[8rem] h-[8rem] flex justify-center items-center mb-12 asteroid asteroid3'
                                id='asteroid4'
                            >
                                <p className='font-bold text-white text-2xl'>{contactAsteroid}</p>
                            </button>

                        </div>
                    </div>
                </div>
            }


        </>
    )
}
