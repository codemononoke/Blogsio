import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { blogEndpoints } from "../../api/apis";
import { setEditBlog } from "../../redux/blogSlice";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const AddBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { editBlog, blog } = useSelector((state) => state.blog);

  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { access_token } = useSelector((state) => state.auth);

  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  useEffect(() => {
    if (editBlog) {
      setValue("blogTitle", blog?.blogTitle);
      setValue("blogShortDesc", blog?.blogShortDesc);
      setValue("blogCategory", blog?.blogCategory);
      setImageFile(blog?.blogCover);
      setPreviewImage(blog?.blogCover);
      setContent(blog?.blogContent);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.blogTitle !== blog?.blogTitle ||
      currentValues.blogShortDesc !== blog?.blogShortDesc ||
      currentValues.blogCategory !== blog?.blogCategory ||
      currentValues.blogCover !== blog?.blogCover ||
      currentValues.blogContent !== blog?.blogContent
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editBlog) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("blogId", blog?._id);
        if (currentValues.blogTitle !== blog?.blogTitle) {
          formData.append("blogTitle", data.blogTitle);
        }
        if (currentValues.blogShortDesc !== blog?.blogShortDesc) {
          formData.append("blogShortDesc", data.blogShortDesc);
        }
        if (currentValues.blogCategory !== blog?.blogCategory) {
          formData.append("blogCategory", data.blogCategory);
        }
        if (currentValues.blogCover !== blog?.blogCover) {
          formData.append("blogCover", data.blogCover);
        }
        if (currentValues.blogContent !== blog?.blogContent) {
          formData.append("blogContent", data.blogContent);
        }
        setLoading(true);
        const toastId = toast.loading("Updating...");
        try {
          const response = await apiConnector(
            "POST",
            blogEndpoints.EDIT_BLOG_API,
            formData,
            {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${access_token}`,
            }
          );
          console.log("EDIT BLOG API RESPONSE.........", response);
          if (!response?.data?.success) {
            throw new Error("Could Not Update Blog ");
          }
          toast.success("Blog Updated Successfully");
          setLoading(false);
          dispatch(setEditBlog(false));
          navigate("/");
        } catch (error) {
          console.log("EDIT BLOG API ERROR..........", error);
          toast.error(error.message);
        }
        toast.dismiss(toastId);
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("blogTitle", data.blogTitle);
    formData.append("blogShortDesc", data.blogShortDesc);
    formData.append("blogCategory", data.blogCategory);
    formData.append("blogCover", data.blogCover);
    formData.append("blogContent", data.blogContent);
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        blogEndpoints.CREATE_BLOG_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        }
      );
      console.log("CREATE COURSE API RESPONSE........", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Add Blog");
      }
      toast.success("Blog Added Successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("CREATE COURSE API ERROR.........", error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    register("blogCover", { required: true });
    register("blogContent", { required: true });
  }, [register]);

  useEffect(() => {
    setValue("blogCover", imageFile);
    setValue("blogContent", content);
  }, [imageFile, setValue, content]);

  return (
    <div
      className={`sm:px-16 px-6 h-[100%] mt-[40px] flex justify-center items-center flex-col`}
    >
      <h1
        className={`font-poppins text-[40px] font-bold text-gray-900 mb-[40px]`}
      >
        Add Blog
      </h1>
      <div className={`w-full max-w-4xl mb-[40px]`}>
        <form
          className={`space-y-8 rounded-md border-[1px] border-gray-300 bg-gray-100 p-6`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`flex flex-col space-y-2`}>
            <label
              className={`text-[16px] font-poppins text-gray-900`}
              htmlFor="blogTitle"
            >
              Blog Title <sup className={`text-red-600`}>*</sup>
            </label>
            <input
              type="text"
              id="blogTitle"
              placeholder="Enter Blog Title"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none w-full`}
              {...register("blogTitle", { required: true })}
            />
            {errors.blogTitle && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Blog title is required
              </span>
            )}
          </div>
          <div className={`flex flex-col space-y-2`}>
            <label
              className={`text-[16px] font-poppins text-gray-900`}
              htmlFor="blogShortDesc"
            >
              Blog Short Description <sup className={`text-red-600`}>*</sup>
            </label>
            <textarea
              type="text"
              id="blogShortDesc"
              placeholder="Enter Description"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none resize-x-none min-h-[130px] w-full`}
              {...register("blogShortDesc", { required: true })}
            />
            {errors.blogShortDesc && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Blog Short Description is required
              </span>
            )}
          </div>
          <div className={`flex flex-col space-y-2`}>
            <label
              className={`text-[16px] font-poppins text-gray-900`}
              htmlFor="blogCategory"
            >
              Blog Category <sup className={`text-red-600`}>*</sup>
            </label>
            <select
              defaultValue=""
              id="blogCategory"
              placeholder="Enter Description"
              className={`rounded-lg bg-white p-3 text-[16px] leading-[24px] text-gray-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-grey-400 focus:outline-none w-full`}
              {...register("blogCategory", { required: true })}
            >
              <option value="" disabled>
                Choose a Category
              </option>
              <option value="Self-Discovery">Self-Discovery</option>
              <option value="Work-Life Balance">Work-Life Balance</option>
              <option value="Mindset Mastery">Mindset Mastery</option>
            </select>
            {errors.blogCategory && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Blog Category is required
              </span>
            )}
          </div>
          <div className={`flex flex-col space-y-2`}>
            <label
              className={`text-[16px] font-poppins text-gray-900`}
              htmlFor="blogCover"
            >
              Blog Cover <sup className={`text-red-600`}>*</sup>
            </label>

            <div
              className={`rounded-lg border-dashed border-[1px] border-gray-400 bg-white p-3  w-full`}
            >
              {previewImage ? (
                <div
                  className={`flex flex-col items-center justify-center gap-y-4`}
                >
                  <img
                    src={previewImage}
                    alt="blog-cover"
                    className={`w-full`}
                  />
                  <button
                    className={` font-poppins text=[16px] text-gray-600 border-b-2 border-gray-600 cursor-pointer`}
                    onClick={(e) => {
                      e.preventDefault();
                      setImageFile(null);
                      setPreviewImage(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <button
                    className={` w-full flex flex-col items-center justify-center py-5`}
                    onClick={handleClick}
                  >
                    <div className="grid aspect-square w-14 place-items-center rounded-full bg-gray-200">
                      <FiUploadCloud className="text-2xl text-gray-600" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Click to{" "}
                      <span className="font-semibold text-red-400">Browse</span>{" "}
                      a file
                    </p>
                  </button>
                </div>
              )}
            </div>
            {errors["blogCover"] && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Blog Cover is required
              </span>
            )}
          </div>
          <div className={`flex flex-col space-y-2`}>
            <label
              className={`text-[16px] font-poppins text-gray-900`}
              htmlFor="blogContent"
            >
              Blog Content <sup className={`text-red-600`}>*</sup>
            </label>
            <ReactQuill
              className={`bg-white w-full `}
              modules={modules}
              formats={formats}
              value={content}
              onChange={(newValue) => setContent(newValue)}
            />
            {errors["blogContent"] && (
              <span className={`-mt-1 text-[12px] text-red-600`}>
                Blog Content is required
              </span>
            )}
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed bg-yellow-200"
                : "cursor-pointer bg-yellow-400"
            } rounded-md  py-2 px-5 font-poppins font-semibold text-gray-900 flex gap-x-1 items-center`}
            type="submit"
          >
            {loading ? "Adding..." : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
