// Next.js core imports
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Next-intl
import { useTranslations, useLocale } from "next-intl";

// Google font
import { Anton } from "next/font/google";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faYoutube, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

// UI Components
import { BussinessCard } from "@/components/ui/BussinessCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { CuriosFact } from "@/components/CuriosFact";
import { Navbar } from "@/components/ui/Navbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { TitleSection } from "@/components/ui/TitleSection";

// Feature Components
import { City } from "@/components/City";
import { Moon } from "@/components/Moon";
import { PicturesInBalloons } from "@/components/Pictures";
import { StarsBackground } from "@/components/Stars";
// Split de bundle: carrusel solo en cliente y fuera del SSR
const UnayMugreCarousel = dynamic(() => import("@/components/CarrouselUnaYMugre"), {
  ssr: false,
  loading: () => <div className="h-48" />,
});

// SVG Icons
import {
  AngularSVG,
  AwsSVG,
  Css3SVG,
  Html5SVG,
  JavaScriptSVG,
  MongoDBSVG,
  NextJsSVG,
  NodejsSVG,
  ReactSVG,
  TailwindSVG,
} from "@/utils/IconsSvgs";

// Assets (imports estáticos)
import me from "@/assets/andres-bonilla-imagen-de-perfil.webp";
import spaceStation from "@/assets/space-station-icon.webp";

const anton = Anton({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Home() {
  const locale = useLocale();
  const imagesALtsI18n = useTranslations("Image-Alts");
  const curiosFactsI18n = useTranslations("Curios-Facts");
  const briefDesc = useTranslations("Brief-Desc");

  const navbarI18n = useTranslations("Navbar");
  const aboutI18n = useTranslations("About");
  const unaymugreI18n = useTranslations("UnaYMugre");
  const projectsI18n = useTranslations("My-Projects");
  const contactI18n = useTranslations("Contact");
  const businessI18n = useTranslations("Business");

  return (
    <>
      <Navbar
        code={navbarI18n("code")}
        changeLenguageText={navbarI18n("changeLenguage")}
        projectAsteroid={navbarI18n("projectsAsteroid")}
        contactAsteroid={navbarI18n("contactAsteroid")}
        aboutAsteroid={navbarI18n("aboutAsteroid")}
        bussinessAsteroid={navbarI18n("bussinessAsteroid")}
      />

      <main className="overflow-x-hidden z-20 relative">
        <PicturesInBalloons />

        <div className="gradient-background relative">
          <StarsBackground>
            {/* simulate navbar height */}
            <div className="h-16" />

            {/* presentation section */}
            <div className="lg:flex-row flex flex-col-reverse lg:flex lg:justify-between items-center lg:items-start h-[84vh] px-[15%]">
              {/* Bloque de texto unificado (un solo H1) */}
              <div className="flex flex-col justify-center lg:justify-end items-center lg:items-start lg:h-[90%] w-full lg:w-auto text-center lg:text-left mt-8 lg:mt-0">
                <p className="text-white text-[1.3rem] xl:text-[1.6rem] text-opacity-80">
                  {briefDesc("desc")}
                </p>

                <h1
                  className={`${anton.className} text-white font-bold text-[2.6rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.1rem] xl:text-[4.5rem] leading-tight`}
                >
                  Andres Bonilla
                </h1>

                {/* Social Media Icons */}
                <div className="flex gap-6 mt-6 justify-center lg:justify-start items-center">
                  <Link
                    href="https://www.linkedin.com/in/andevbonilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-white text-[2rem] hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/andevbonilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-white text-[2rem] hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link
                    href="https://github.com/andevbonilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-white text-[2rem] hover:text-gray-300 transition-colors" />
                  </Link>

                  <Link
                    href={`https://${(locale === "en") ? "" : `${locale}.`}fiverr.com/andresbonilla_1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors ml-2"
                  >
                    {briefDesc("hireMe")}
                  </Link>
                </div>
              </div>

              {/* Foto principal (LCP): import estático + priority + sizes */}
              <div className="flex flex-col justify-center items-center w-[100%] lg:ml-[3rem] lg:w-auto lg:h-[100%]">
                <Image
                  src={me}
                  alt={imagesALtsI18n("andevbonilla-profile-picture")}
                  priority
                  sizes="(min-width:1280px) 24rem, (min-width:1024px) 24rem, 100vw"
                  className="w-full max-w-[20rem] xl:max-w-[24rem] h-auto object-cover floating border-[1.2rem] sm:border-[1.5rem] border-white border-b-[3.5rem] sm:border-b-[4rem] mt-[5vh] lg:mt-[10vh]"
                />
              </div>
            </div>

            {/* about me */}
            <section className="md:px-[20%] px-[10%]" id="about">
              <TitleSection text={aboutI18n("title")} />
              <p className="text-white text-center text-xl leading-10 text-opacity-80">
                {aboutI18n("text")}
              </p>
            </section>

            <CuriosFact meters={"384.000"} text={curiosFactsI18n("1")} />

            {/* moon part */}
            <Moon altMoon={imagesALtsI18n("moonPicture")} />

            {/* my business */}
            <section className="w-full z-30" id="business-part">
              <TitleSection text={businessI18n("title")} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-[10%]">
                <BussinessCard
                  desc={businessI18n("FocusRocket")}
                  imgUrl={"focusrocket-logo.webp"}
                  status={"green"}
                  name={"FocusRocket"}
                  statusName={"Active"}
                  visitTranslation={businessI18n("visit")}
                  link={"https://chromewebstore.google.com/detail/focusrocket-%E2%80%93-website-blo/ahgbpamhpicnehhhemkgmbhmmhcjbepj"}
                />
                <BussinessCard
                  desc={businessI18n("Simpliterms")}
                  imgUrl={"simpliterms-logo.webp"}
                  status={"green"}
                  name={"Simpliterms"}
                  statusName={"Active"}
                  visitTranslation={businessI18n("visit")}
                  link={"https://www.simpliterms.com/"}
                />
                <BussinessCard
                  desc={businessI18n("Movete")}
                  imgUrl={"movete-logo.webp"}
                  status={"red"}
                  name={"Movete"}
                  statusName={"Discontinued"}
                  visitTranslation={businessI18n("visit")}
                  link={"https://movete.vercel.app/"}
                />
                <BussinessCard
                  desc={businessI18n("Fansive")}
                  imgUrl={"fansive-logo.webp"}
                  status={"red"}
                  name={"Fansive"}
                  statusName={"Discontinued"}
                  visitTranslation={businessI18n("visit")}
                  link={"https://fansive.netlify.app/"}
                />
              </div>
            </section>

            {/* una y mugre */}
            <section className="md:px-[20%] px-[10%]">
              <TitleSection text={unaymugreI18n("title")} />
              <p className="text-center text-white text-opacity-90 text-lg">
                {unaymugreI18n("desc")}
              </p>

              <UnayMugreCarousel />

              <div className="flex justify-center items-center">
                <Link
                  href={"https://www.instagram.com/mugre.fit/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Uña y Mugre"
                  title="instagram of Uña Y Mugre"
                >
                  <FontAwesomeIcon className="text-white hover:text-[#DFDFDF] transition-all duration-150 md:w-[2.5rem] md:h-[2.5rem] w-[2rem] h-[2rem] mx-7" icon={faInstagram} />
                </Link>

                <Link
                  href={"https://www.tiktok.com/@mugre.fit"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok de Uña y Mugre"
                  title="tiktok of Uña Y Mugre"
                >
                  <FontAwesomeIcon className="text-white hover:text-[#DFDFDF] transition-all duration-150 md:w-[2.5rem] md:h-[2.5rem] w-[2rem] h-[2rem] mx-7" icon={faTiktok} />
                </Link>

                <Link
                  href={"https://www.youtube.com/@U%C3%B1ayMugreFIT/shorts"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube de Uña y Mugre"
                  title="youtube of Uña Y Mugre"
                >
                  <FontAwesomeIcon className="text-white hover:text-[#DFDFDF] transition-all duration-150 md:w-[2.5rem] md:h-[2.5rem] w-[2rem] h-[2rem] mx-7" icon={faYoutube} />
                </Link>
              </div>
            </section>

            <CuriosFact meters={"400"} text={curiosFactsI18n("2")} />

            <section className="flex relative h-[5rem]">
              <Image
                src={spaceStation}
                alt={imagesALtsI18n("InternationalSpaceStation")}
                className="international-space-station w-[30rem]"
                id="international-space-station"
              />
            </section>

            {/* my projects */}
            <section className="z-20" id="projects">
              <TitleSection text={projectsI18n("title")} />
              <p className="text-center text-white text-opacity-90 text-lg mb-8 px-[10%]">
                {projectsI18n("subtitle")}
              </p>

              <ProjectsGrid
                moreProjectsText={projectsI18n("moreProjects")}
                projects={[
                  {
                    name: "NinjaPrompt",
                    desc: projectsI18n("ninjaPromptDesc"),
                    link: "https://chromewebstore.google.com/detail/ninjaprompt/pgdjmcokonbeadgpcfdhoecnkjdgaeol",
                    github: "https://github.com/andevbonilla/NinjaPrompt",
                    imgUrl: "ninjaprompt-interface.webp",
                    buttonText: projectsI18n("viewButton"),
                    iconList: [
                      <JavaScriptSVG className="w-[3rem]" key="javascript" />,
                      <Html5SVG className="w-[3rem]" key="html5" />,
                      <Css3SVG className="w-[3rem]" key="css3" />,
                    ],
                  },
                  {
                    name: "Virtual Board",
                    desc: projectsI18n("virtualBoardDesc"),
                    link: "https://super-virtual-board.netlify.app/",
                    github: "https://github.com/andevbonilla/Virtual-Board",
                    imgUrl: "virtualboard-interface.webp",
                    buttonText: projectsI18n("viewButton"),
                    iconList: [
                      <ReactSVG className="w-[3rem]" key="react" />,
                      <Html5SVG className="w-[3rem]" key="html5" />,
                      <Css3SVG className="w-[3rem]" key="css3" />,
                    ],
                  },
                  {
                    name: "YourDreamCar",
                    desc: projectsI18n("yourDreamCarDesc"),
                    link: "https://your-dream-car.vercel.app/",
                    github: "https://github.com/andevbonilla/YourDreamCar",
                    imgUrl: "yourdreamcar-interface.webp",
                    buttonText: projectsI18n("viewButton"),
                    iconList: [
                      <Html5SVG className="w-[3rem]" key="html5" />,
                      <TailwindSVG className="w-[3rem]" key="tailwind" />,
                      <NextJsSVG className="w-[3rem]" key="nextjs" />,
                    ],
                  },
                  {
                    name: "Geekepedia",
                    desc: projectsI18n("geekepediaDesc"),
                    link: "https://andevbonilla.github.io/Geekipedia/home/Geekipedia",
                    github: "https://github.com/andevbonilla/Geekipedia",
                    imgUrl: "geekipedia-interface.webp",
                    buttonText: projectsI18n("viewButton"),
                    iconList: [
                      <AngularSVG className="w-[3rem]" key="angular" />,
                      <Html5SVG className="w-[3rem]" key="html5" />,
                      <Css3SVG className="w-[3rem]" key="css3" />,
                    ],
                  },
                  {
                    name: "FileBox",
                    desc: projectsI18n("fileBoxDesc"),
                    link: "https://filebox.netlify.app/#/login",
                    github: "https://github.com/andevbonilla/backend-fileBox",
                    imgUrl: "filebox-interface.webp",
                    buttonText: projectsI18n("viewButton"),
                    iconList: [
                      <AngularSVG className="w-[3rem]" key="angular" />,
                      <MongoDBSVG className="w-[3rem]" key="mongodb" />,
                      <AwsSVG className="w-[3rem]" key="aws" />,
                      <NodejsSVG className="w-[3rem]" key="nodejs" />,
                    ],
                  },
                ]}
              />
            </section>

            <div className="h-[5rem]" />
          </StarsBackground>

          <City curiosfactText={curiosFactsI18n("3")} />
        </div>

        <div className="underground">
          <section className="px-[13%]" id="contact-form">
            <TitleSection text={contactI18n("title")} />
            <ContactForm
              namePlaceholder={contactI18n("namePlaceholder")}
              emailPlaceholder={contactI18n("emailPlaceholder")}
              messagePlaceholder={contactI18n("messagePlaceholder")}
              actionButton={contactI18n("actionButton")}
              errorNameRequired={contactI18n("errorNameRequired")}
              errorEmail={contactI18n("errorEmail")}
              errorMessage={contactI18n("errorMessage")}
              success={contactI18n("success")}
              errorGlobal={contactI18n("error")}
            />
            <div className="w-full bg-brown-500 text-center text-white text-opacity-90 text-lg pb-10">
              <p>Made with ❤️ by Andres Bonilla</p>
            </div>
          </section>
        </div>

      </main>
    </>
  );
}
