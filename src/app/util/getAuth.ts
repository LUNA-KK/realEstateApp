interface Props {
  onFetch?: () => void;
}

export const getAuth = ({ onFetch }: Props) => {
  if (localStorage.getItem("refreshToken")) {
    const refreshToken = localStorage.getItem("refreshToken");

    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          sessionStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          if (onFetch) {
            onFetch();
          }
          return 1;
        } else {
          alert("로그인 정보가 만료되었습니다.");
          localStorage.removeItem("refreshToken");
          sessionStorage.removeItem("accessToken");
          throw new Error("로그인 정보가 만료되었습니다.");
        }
      });
  }
  return 1;
};
