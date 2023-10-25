import React, { useEffect } from "react";
import { apiConnector } from "../../api/apiConnector";
import { blogEndpoints } from "../../api/apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setBlog, setLoading, setEditBlog } from "../../redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BlogDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.profile);
  const { access_token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  useEffect(() => {
    const getBlogById = async () => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector(
          "GET",
          `${blogEndpoints.GET_BLOG_BY_ID}/${id}`
        );
        if (!response?.data?.success) {
          throw new Error("Could Not Fetch Blog By Id");
        }
        dispatch(setBlog(response?.data?.data));
      } catch (error) {
        console.log("GET_BLOG_BY_API API ERROR........", error);
        toast.error(error.message);
      }
      dispatch(setLoading(false));
    };
    getBlogById();
  }, [id]);

  const deleteBlog = async (blogId) => {
    try {
      const response = await apiConnector(
        "DELETE",
        blogEndpoints.DELETE_BLOG_API,
        {
          blogId: blogId.toString(),
        },
        {
          Authorization: `Bearer ${access_token}`,
        }
      );
      console.log("DELETE_BLOG_API API RESPONSE.......", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Blog");
      }
      toast.success("Blog Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log("DELETE_BLOG_API API ERROR.........", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`sm:px-16 px-6 h-[100%] mt-[40px] flex justify-center items-center flex-col`}
        >
          <div className={`w-full max-w-4xl mb-[40px]`}>
            {blog && (
              <div>
                <div
                  className={`flex ss:flex-row flex-col ss:items-center items-start gap-[14px] mb-[16px]`}
                >
                  <div className="flex flex-row items-center gap-[12px]">
                    <img
                      src={blog?.author?.profileImage}
                      alt={`profile-${blog?.author?.name}`}
                      className={`aspect-square w-[40px] rounded-full object-cover`}
                    />
                    <h3
                      className={` font-poppins font-bold text-[18px] text-gray-900 `}
                    >
                      {blog?.author?.name}
                    </h3>
                  </div>
                  <div className={`flex items-center ss:gap-x-0 gap-x-4`}>
                    <h3
                      className={` font-poppins ss:font-bold font-semibold ss:ml-[0px] ml-[4px] ss:text-[18px] text-[14px] text-gray-400 ss:border-l-2 border-l-0 border-gray-300 ss:pl-[14px] pl-0`}
                    >
                      <Moment format="MMMM Do YYYY">{blog?.createdAt}</Moment>
                    </h3>
                    {blog?.author?._id === user?._id && (
                      <div
                        className={`flex items-center ss:ml-5 ml-0 gap-x-3 ss:mb-0 mb-1`}
                      >
                        <button
                          onClick={() => {
                            dispatch(setEditBlog(true));
                            navigate("/add-blog");
                          }}
                        >
                          <FaEdit
                            className={` text-blue-600 ss:text-[25px] text-[20px] cursor-pointer`}
                          />
                        </button>
                        <button onClick={() => deleteBlog(blog?._id)}>
                          <MdDelete
                            className={` text-red-600 ss:text-[25px] text-[20px] cursor-pointer`}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h1
                  className={`font-poppins font-semibold ss:text-[56px] text-[32px] text-gray-900 ss:leading-[60px] leading-[35px] mb-[24px]`}
                >
                  {blog?.blogTitle}
                </h1>
                <span
                  className={`font-poppins font-normal ss:text-[24px] text-[16px] text-gray-900 leading-7`}
                >
                  {blog?.blogShortDesc}
                </span>
                <img
                  src={blog?.blogCover}
                  alt="blog-cover"
                  className={`w-full rounded-lg ss:mt-[60px] mt-[40px]`}
                />
                <div
                  className={` mt-[30px] font-poppins font-normal ss:text-[20px] text-[18px] text-gray-900 ss:leading-8 leading-7`}
                  dangerouslySetInnerHTML={{ __html: blog?.blogContent }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
