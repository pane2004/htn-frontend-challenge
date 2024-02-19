interface IconProps {
  colour?: string;
}

export function Gear({ colour = "shadow-fuchsia-400" }: IconProps) {
  return (
    <div className="w-12 md:w-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        className={`drop-shadow ${colour} brightness-75 hover:brightness-100 w-full spin-on-hover`}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M18.763 13.7944L20.029 16.0222C19.8786 16.3163 19.7105 16.6051 19.5244 16.8873C19.3383 17.1695 19.1391 17.4378 18.9281 17.6919L16.4377 17.4142C15.7715 17.9608 15.0027 18.3869 14.1645 18.6592L13.0002 20.945C12.6719 20.9813 12.3382 21 12.0002 21C11.6622 21 11.3285 20.9813 11.0002 20.945L9.83293 18.6582C8.99428 18.3854 8.22514 17.9585 7.5589 17.4111L5.05407 17.6915C4.84303 17.4374 4.64381 17.1691 4.45774 16.8869C4.27168 16.6047 4.10356 16.3159 3.95312 16.0218L5.22637 13.7814C5.07803 13.2142 5.00021 12.6139 5.00021 12.0002C5.00021 11.3749 5.08219 10.7688 5.23599 10.192L3.95351 7.936C4.10394 7.64191 4.27206 7.3531 4.45812 7.07091C4.64419 6.78873 4.84341 6.52043 5.05445 6.2663L7.60942 6.55327C8.26776 6.02075 9.01625 5.60683 9.84 5.33984M9.83614 5.33996L11 3.05493C11.3283 3.01863 11.662 3 12 3C12.338 3 12.6716 3.01863 13 3.05493L14.1638 5.33996C14.9882 5.60716 15.7389 6.01764 16.3976 6.55077L18.9275 6.26661C19.1385 6.52074 19.3377 6.78904 19.5238 7.07123C19.7098 7.35341 19.878 7.64223 20.0284 7.93632L18.7592 10.1697M18.7594 10.1732C18.9164 10.7556 19.0002 11.3681 19.0002 12.0002C19.0002 12.6215 18.9193 13.2239 18.7673 13.7974M15.0002 12.0002C15.0002 13.657 13.6571 15.0002 12.0002 15.0002C10.3433 15.0002 9.0002 13.657 9.0002 12.0002C9.0002 10.3433 10.3433 9.00015 12.0002 9.00015C13.6571 9.00015 15.0002 10.3433 15.0002 12.0002Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function Star({ colour = "shadow-fuchsia-400" }: IconProps) {
  return (
    <div className="w-8 md:w-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        className={`drop-shadow ${colour} brightness-75 hover:brightness-100 w-full`}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function Square({ colour = "shadow-fuchsia-400" }: IconProps) {
  return (
    <div className="w-8 md:w-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow ${colour} brightness-75 hover:brightness-100 w-full`}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
