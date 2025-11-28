import useBlog from "./api/useBlog";
import useBoilerplate from "./api/useBoilerplate";
import useReview from "./api/useReview";
import useTest from "./api/useTest";

export default function () {

    const boilerplateApi = useBoilerplate();
    const testApi = useTest();
    const reviewApi = useReview();
    const blogApi = useBlog();
    return {
      boilerplate:{...boilerplateApi},
      test:{...testApi},
      review:{...reviewApi},
      blog:{...blogApi},
    };
  }