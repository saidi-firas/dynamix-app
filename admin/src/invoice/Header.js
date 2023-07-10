import logo from "./../assets/logo.png";
export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
      <div>
        <h1 className="font-bold uppercase tracking-wide text-xl mb-3">
          Dynamix shop
        </h1>
      </div>

      <div className="flex items-center justify-center xl:justify-end">
        <div className="w-10 h-10 xl:w-20 xl:h-20">
          <img src={logo} alt="" />
        </div>
      </div>
    </header>
  );
}
