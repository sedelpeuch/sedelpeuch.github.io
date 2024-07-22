import WebDeveloperSvg from "@site/static/svg/undraw_web_developer.svg";
import OpenSourceSvg from "@site/static/svg/undraw_open_source.svg";
import SpiderSvg from "@site/static/svg/undraw_spider.svg";
import Translate, { translate } from "@docusaurus/Translate";

export type FeatureItem = {
  title: string;
  text: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
};

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.feature.developer",
      message: "Ingénieur",
    }),
    text: (
      <ul>
        <li>
          Ingénieur en robotique au CATIE au sein de l’unité Système
          Cyber-Physique.
        </li>
        <li>
          Spécialisé en ROS, coordinateur de l’équipe CATIE Robotics participant
          à la Robocup dans la ligue @home et coordinateur de la R&D en
          robotique.
        </li>
        <li>
          Pro-actif sur la mise en place des infrastrucres et des technologies
          DevOps{" "}
        </li>
        <li>
          Sujets de travail : navigation autonome et sociale, préhension, CI/CD
          , self-hosting, infrastrucre
        </li>
      </ul>
    ),
    Svg: WebDeveloperSvg,
  },
  {
    title: translate({
      id: "homepage.feature.spider",
      message: "Bénévole",
    }),
    text: (
      <ul>
        <li>2020 – 2021 : Président de l’association de robotique EIRBOT</li>
        <li>
          2021 – 2022 : Président de l’association EirLab Community animant et
          gérant le fablab de l’ENSEIRB-MATMECA
        </li>
        <li>
          2022 – 2023 : Vice-Président Resp. des Fabmanagers d’EirLab Community
        </li>
        <li>2021 – 2023 : Responsable Logistique d’AI4Industry</li>
      </ul>
    ),
    Svg: SpiderSvg,
  },
  {
    title: translate({
      id: "homepage.feature.enthusiast",
      message: "Maker",
    }),
    text: (
      <ul>
        <li>Open Source enthusiast</li>
        <li>Self-hosting fan</li>
        <li>Fablab lover</li>
        <li>DIY addict</li>
      </ul>
    ),
    Svg: OpenSourceSvg,
  },
];

export default FEATURES;
