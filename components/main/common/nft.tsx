import html2canvas from "html2canvas";
import { useObserver } from "mobx-react";
import React, { useRef } from "react";
import { Offers } from "../../../stores/main/marry.store";
import styles from "./footer.module.less";

export const NFT = (props: {
  offer?: Offers;
  width?: number;
  isA?: boolean;
}) => {
  const svgref = useRef(null);
  {
    /* <image
          id="image0"
          width="1600"
          height="1600"
          xlinkHref={
            props.offer?.bgIndex
              ? `${window.location.origin}/bg/${props.offer.bgIndex}.png`
              : `${window.location.origin}/bg/1.png`
          }
        /> */
  }
  return useObserver(() => (
    <div
      style={{
        backgroundImage: props.offer?.bgIndex
          ? `url(${window.location.origin}/bg/0${props.offer.bgIndex}.png)`
          : `url(${window.location.origin}/bg/1.png)`,
        backgroundSize: "100% 100%",
        position: "relative",
        width: props.width + "px",
        height: props.width + "px",
      }}
    >
      <img
        className="cover_1"
        style={{
          background: "#fff",
          width: (250 * props.width) / 1080 + "px",
          height: (250 * props.width) / 1080 + "px",
          left: (90 * props.width) / 1080 + "px",
          top: (90 * props.width) / 1080 + "px",
          position: "absolute",
          borderTopLeftRadius: "50%",
          borderTopRightRadius: "50%",
        }}
        src={
          props.offer?.Acover
            ? `/api/proxy?url=${encodeURIComponent(props.offer?.Acover)}`
            : "/heart-cover.png"
        }
      />
      <img
        className="cover_2"
        style={{
          background: "#fff",
          width: (250 * props.width) / 1080 + "px",
          height: (250 * props.width) / 1080 + "px",
          left: (90 * props.width) / 1080 + "px",
          top: (340 * props.width) / 1080 + "px",
          position: "absolute",
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
        src={
          props.offer?.Bcover
            ? `/api/proxy?url=${encodeURIComponent(props.offer?.Bcover)}`
            : "/heart-cover.png"
        }
      />
      <img
        className="logo"
        style={{
          width: (160 * 1.5 * props.width) / 1080 + "px",
          height: (47 * 1.5 * props.width) / 1080 + "px",
          right: (70 * props.width) / 1080 + "px",
          bottom: (90 * props.width) / 1080 + "px",
          position: "absolute",
        }}
        src={"/logo.png"}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
        style={{
          width: props.width ? `${props.width}px` : "",
          height: props.width ? `${props.width}px` : "",
        }}
      >
        <defs>
          <rect id="path_0" x="0" y="0" width="1080" height="1080" />
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              transform="translate(0 0) scale(0.000625 0.000625) rotate(0)"
              xlinkHref="#image0"
            />
          </pattern>

          <linearGradient
            id="linear_0"
            x1="94.01960915436382%"
            y1="8.222227269432537%"
            x2="100%"
            y2="1000%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#FFD2D2" stop-opacity="0.66" />
            <stop offset="1" stop-color="#FFD4D4" stop-opacity="0.32" />
          </linearGradient>
          <filter
            id="filter_13"
            x="-120"
            y="-120"
            width="1260"
            height="1140"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur
              in="BackgroundImage"
              stdDeviation="60"
              edgeMode="duplicate"
            />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur"
              result="shape"
            />
          </filter>
          <filter
            id="filter_44"
            x="409"
            y="171"
            width="596"
            height="108"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.8470588235294118 0 0 0 0 0.8470588235294118 0 0 0 0 0.8470588235294118 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_Shadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_Shadow"
              result="shape"
            />
          </filter>
          <filter
            id="filter_48"
            x="409"
            y="426"
            width="584"
            height="108"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.8470588235294118 0 0 0 0 0.8470588235294118 0 0 0 0 0.8470588235294118 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_Shadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_Shadow"
              result="shape"
            />
          </filter>
          <pattern
            id="pattern1"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
            fill="#fff"
          >
            <use
              transform="translate(0 0) scale(0.0016666666666666668 0.0016666666666666668) rotate(0)"
              xlinkHref="#image1"
            />
          </pattern>
          {/* <image
            id="image1"
            width="600"
            height="600"
            fill="#fff"
            style={{ background: "#fff" }}
            xlinkHref={
              props.offer?.Bcover
                ? `/api/proxy?url=${encodeURIComponent(props.offer?.Bcover)}`
                : "/bg/blank.png"
            }
          /> */}
          <pattern
            id="pattern2"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              transform="translate(0 0) scale(0.0016666666666666668 0.0016666666666666668) rotate(0)"
              xlinkHref="#image2"
            />
          </pattern>
        </defs>
        <g opacity="1" transform="translate(0 0)  rotate(0 540 540)">
          {/* <rect
          fill="#FFFFFF"
          opacity="1"
          transform="translate(0 0)  rotate(0 540 540)"
          x="0"
          y="0"
          width="1080"
          height="1080"
          rx="0"
        /> */}
          <mask id="bg-mask-0" fill="white">
            <use xlinkHref="#path_0"></use>
          </mask>
          <g mask="url(#bg-mask-0)">
            <path
              id="Rectangle"
              fill-rule="evenodd"
              style={{ fill: "url(#pattern0)" }}
              transform="translate(0 0)  rotate(-360 540 540)"
              opacity="1"
              d="M0,0L0,1080L1080,1080L1080,0L0,0Z "
            />

            <g opacity="1" transform="translate(0 0)  rotate(0 540 480)">
              <g
                id="Bg shape"
                filter="url(#filter_13)"
                // style={{ opacity: 0.5 }}
              >
                <path
                  id="Bg shape"
                  fill-rule="evenodd"
                  fill="url(#linear_0)"
                  transform="translate(30 30)  rotate(0 510 450)"
                  opacity="1"
                  d="M0,900L675,900C865.54,900 1020,745.54 1020,555L1020,0L0,0L0,900Z "
                />
              </g>
              <g opacity="1" transform="translate(100 755)  rotate(0 138.5 56)">
                <g opacity="1" transform="translate(0 0)  rotate(0 138.5 16)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 61.5 16)">
                    <text>
                      <tspan
                        x="0"
                        y="24"
                        font-size="24"
                        line-height="0"
                        fill="#361041"
                        opacity="1"
                        font-family="OPPOSans-R"
                        letter-spacing="0"
                      >
                        Blockchain
                      </tspan>
                    </text>
                  </g>
                  <g opacity="1" transform="translate(138 0)  rotate(0 6 14.5)">
                    <text>
                      <tspan
                        x="0"
                        y="23"
                        font-size="24"
                        line-height="0"
                        fill="#EDEDED"
                        opacity="1"
                        font-family="Inter-SemiBold"
                        letter-spacing="0"
                      >
                        •
                      </tspan>
                    </text>
                  </g>
                  <g opacity="1" transform="translate(165 0)  rotate(0 56 16)">
                    <text>
                      <tspan
                        x="0"
                        y="24"
                        font-size="24"
                        line-height="0"
                        fill="#361041"
                        opacity="1"
                        font-family="OPPOSans-R"
                        letter-spacing="0"
                      >
                        Ethereum
                      </tspan>
                    </text>
                  </g>
                </g>
                <g opacity="1" transform="translate(0 40)  rotate(0 115.5 16)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 115.5 16)">
                    <g opacity="1" transform="translate(0 0)  rotate(0 38 16)">
                      <text>
                        <tspan
                          x="0"
                          y="24"
                          font-size="24"
                          line-height="0"
                          fill="#361041"
                          opacity="1"
                          font-family="OPPOSans-R"
                          letter-spacing="0"
                        >
                          Protocol
                        </tspan>
                      </text>
                    </g>
                    <g
                      opacity="1"
                      transform="translate(138 0)  rotate(0 6 14.5)"
                    >
                      <text>
                        <tspan
                          x="0"
                          y="23"
                          font-size="24"
                          line-height="0"
                          fill="#EDEDED"
                          opacity="1"
                          font-family="Inter-SemiBold"
                          letter-spacing="0"
                        >
                          •
                        </tspan>
                      </text>
                    </g>
                    <g
                      opacity="1"
                      transform="translate(164 0)  rotate(0 56.5 16)"
                    >
                      <text>
                        <tspan
                          x="0"
                          y="24"
                          font-size="24"
                          line-height="0"
                          fill="#361041"
                          opacity="1"
                          font-family="OPPOSans-R"
                          letter-spacing="0"
                        >
                          ERC721-520
                        </tspan>
                      </text>
                    </g>
                  </g>
                </g>
                <g opacity="1" transform="translate(0 80)  rotate(0 113 16)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 113 16)">
                    <g opacity="1" transform="translate(0 0)  rotate(0 47 16)">
                      <text>
                        <tspan
                          x="0"
                          y="24"
                          font-size="24"
                          line-height="0"
                          fill="#361041"
                          opacity="1"
                          font-family="OPPOSans-R"
                          letter-spacing="0"
                        >
                          DATETIME
                        </tspan>
                      </text>
                    </g>
                    <g
                      opacity="1"
                      transform="translate(138 0)  rotate(0 6 14.5)"
                    >
                      <text>
                        <tspan
                          x="0"
                          y="23"
                          font-size="24"
                          line-height="0"
                          fill="#EDEDED"
                          opacity="1"
                          font-family="Inter-SemiBold"
                          letter-spacing="0"
                        >
                          •
                        </tspan>
                      </text>
                    </g>
                    <g
                      opacity="1"
                      transform="translate(164 0)  rotate(0 45 16)"
                    >
                      <text>
                        <tspan
                          x="0"
                          y="24"
                          font-size="24"
                          line-height="0"
                          fill="#361041"
                          opacity="1"
                          font-family="OPPOSans-R"
                          letter-spacing="0"
                        >
                          #{props.offer?.mintedAt}
                        </tspan>
                      </text>
                    </g>
                  </g>
                </g>
              </g>
              <g id="道格拉斯盗盗" filter="url(#filter_44)">
                <g opacity="1" transform="translate(410 172)  rotate(0 297 53)">
                  <text>
                    <tspan
                      x="0"
                      y="80"
                      font-size="80"
                      line-height="0"
                      fill="#361041"
                      opacity="1"
                      font-family="OPPOSans-L"
                      letter-spacing="0"
                    >
                      {props.offer?.Aname}
                    </tspan>
                  </text>
                </g>
              </g>
              <g
                opacity="1"
                transform="translate(410 278)  rotate(0 120.5 63.5)"
              >
                <text>
                  <tspan
                    x="0"
                    y="96"
                    font-size="96"
                    line-height="0"
                    fill="#DDDDDD"
                    opacity="1"
                    font-family="OPPOSans-L"
                    letter-spacing="0"
                  >
                    &amp;
                  </tspan>
                </text>
              </g>
              <g id="玲娜贝儿" filter="url(#filter_48)">
                <g opacity="1" transform="translate(410 427)  rotate(0 191 53)">
                  <text>
                    <tspan
                      x="0"
                      y="80"
                      font-size="80"
                      line-height="0"
                      fill="#361041"
                      opacity="1"
                      font-family="OPPOSans-L"
                      letter-spacing="0"
                    >
                      {props.offer?.Bname}
                    </tspan>
                  </text>
                </g>
              </g>
              <path
                id="Rectangle 242"
                fill-rule="evenodd"
                style={{ fill: "url(#pattern1)" }}
                transform="translate(90 340)  rotate(0 125 125)"
                opacity="1"
                d="M125,250L125,250C158.15,250 189.95,236.83 213.39,213.39C236.83,189.95 250,158.15 250,125L250,0L0,0L0,125C0,158.15 13.17,189.95 36.61,213.39C60.05,236.83 91.85,250 125,250Z "
              />
              <path
                id="Rectangle 243"
                fill-rule="evenodd"
                style={{ fill: "url(#pattern2)" }}
                transform="translate(90 90)  rotate(0 125 125)"
                opacity="1"
                d="M0,250L250,250L250,125C250,91.85 236.83,60.05 213.39,36.61C189.95,13.17 158.15,0 125,0L125,0C91.85,0 60.05,13.17 36.61,36.61C13.17,60.05 0,91.85 0,125L0,250Z "
              />
            </g>
            <g
              opacity="1"
              transform="translate(1051 1071) scale(-1 -1) rotate(0 522 14.5)"
            >
              <text>
                <tspan
                  x="0"
                  y="23"
                  font-size="24"
                  line-height="0"
                  fill="#EDEDED"
                  opacity="1"
                  font-family="Inter-SemiBold"
                  letter-spacing="9.84"
                >
                  {props.offer?.Aaddress?.toUpperCase()}
                </tspan>
              </text>
            </g>
            <g
              opacity="1"
              transform="translate(543.5 537.5)  rotate(90 522 14.5)"
            >
              <text>
                <tspan
                  x="0"
                  y="23"
                  font-size="24"
                  line-height="0"
                  fill="#EDEDED"
                  opacity="1"
                  font-family="Inter-SemiBold"
                  letter-spacing="9.84"
                >
                  {props.offer?.Baddress?.toUpperCase()}
                </tspan>
              </text>
            </g>
            <g
              opacity="1"
              transform="translate(-507.5 511.5)  rotate(-90 522 14.5)"
            >
              <text>
                <tspan
                  x="0"
                  y="23"
                  font-size="24"
                  line-height="0"
                  fill="#EDEDED"
                  opacity="1"
                  font-family="Inter-SemiBold"
                  letter-spacing="9.84"
                >
                  {props.offer?.Baddress?.toUpperCase()}
                </tspan>
              </text>
            </g>
            <g opacity="1" transform="translate(32 0)  rotate(0 522 14.5)">
              <text>
                <tspan
                  x="0"
                  y="23"
                  font-size="24"
                  line-height="0"
                  fill="#EDEDED"
                  opacity="1"
                  font-family="Inter-SemiBold"
                  letter-spacing="9.84"
                >
                  {props.offer?.Aaddress?.toUpperCase()}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  ));
};
