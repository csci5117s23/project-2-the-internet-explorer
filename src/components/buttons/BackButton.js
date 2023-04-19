import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const BackButton = () => {
  const router = useRouter();
  return (
    <button type="button">
      <FontAwesomeIcon
        onClick={() => router.back()}
        className="text-4xl"
        style={{ color: "#c6d2ec" }}
        icon={faChevronLeft}
      />
    </button>
  );
};
export default BackButton;
