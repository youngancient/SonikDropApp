import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export interface IClassStyle {
  classNames?: string;
}
export const FooterComponent: React.FC<IClassStyle> = ({ classNames }) => {
  return (
    <div
      className={`flex justify-center text-white h-[100px] items-center px-2 md:px-[200px] pt-[1rem] ${classNames}`}
    >
      <div className="flex gap-2 items-center">
        <Link to="https://github.com/orgs/sonikdrop/repositories" target="_blank">
          <div>Contribute to SonikDrop</div>
        </Link>
        <Link to="https://github.com/orgs/sonikdrop/repositories" target="_blank">
          <FaGithub className="text-[20px]" />
        </Link>
      </div>
    </div>
  );
};
