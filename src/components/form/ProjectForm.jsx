// React Imports
import { useState } from "react";
// Next Imports
import Image from "next/image";
import { useRouter } from "next/router";
// React Icons Imports
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
// Components Import
import { Button, CustomFilter, FormField, Notify } from "..";
// Constants Import
import { categoryFilters } from "@/constant";
// Utility Functions Import
import { resizeFile } from "@/utils";
// Utility APIs Import
import { createProject, editProject } from "@/utils/api";

const ProjectForm = ({ type, projectDetails }) => {
  // projectDetails PROPS IS FOR EDIT PAGE
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // FORM VALUES
  const [form, setForm] = useState({
    title: projectDetails?.title || "",
    description: projectDetails?.description || "",
    image: projectDetails?.image || "",
    category: projectDetails?.category || "",
    websiteUrl: projectDetails?.websiteUrl || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "create") {
      if (form.image && form.category) {
        setIsSubmitting(true);
        const result = await createProject(form);
        setIsSubmitting(false);
        if (result.status === "success") {
          Notify(result.status, result.message);
          router.push("/");
        } else {
          Notify(result.status, result.message);
        }
      }
    } else if (type === "edit") {
      if (form.image && form.category) {
        setIsSubmitting(true);
        const result = await editProject(projectDetails?._id, form);
        setIsSubmitting(false);
        if (result.status === "success") {
          Notify(result.status, result.message);
          router.push("/");
        } else {
          Notify(result.status, result.message);
        }
      }
    }
  };

  const handleChangeImage = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) return;
    if (!file.type.includes("image/")) return alert("Please an image file!");

    const image = await resizeFile(file);
    setForm({
      ...form,
      image: image,
    });
  };

  const handleChangeInputValue = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-5 space-y-10">
      {/* //   IMAGE FILE SECTION    //*/}
      <div className="form-image-container">
        <label className="form-image-label p-3 text-center">
          {!form?.image && (
            <>
              <AiOutlineFolderAdd className="text-4xl text-gray-700" />
              <span>Drag and Drop or tap here to upload a Photo</span>
              <span className="text-purple-600 font-semibold bg-purple-50 py-1 px-3">
                Images less than 10MB
              </span>
            </>
          )}
        </label>
        <input
          type="file"
          required={type === "create"}
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer z-30"
          onChange={handleChangeImage}
        />
        {form?.image && (
          <Image
            className="object-contain"
            src={form?.image}
            fill
            alt="project image"
          />
        )}
      </div>
      {/* //   DELETE IMAGE SECTION    //*/}
      {form?.image && (
        <div className="flex items-center justify-center w-full">
          <div
            onClick={() => setForm({ ...form, image: "" })}
            className=" p-4 w-fit rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition duration-100 ease-in-out"
          >
            <FiTrash />
          </div>
        </div>
      )}
      {/* CATEGORY SECTION */}
      <CustomFilter filters={categoryFilters} setForm={setForm} form={form} />
      {/* //   FORM INPUTES SECTION    //*/}
      <div className="space-y-5">
        {/* TITLE */}
        <FormField
          inputStyles="create-edit-form-input"
          name="title"
          optional
          focusOn
          type="text"
          inputLabel="Title"
          placeholder="Title"
          formValue={form.title}
          handleChange={handleChangeInputValue}
        />
        {/* DESCRIPTION */}
        <FormField
          inputStyles="create-edit-form-input"
          name="description"
          optional
          type="text"
          inputLabel="Description"
          placeholder="Description"
          formValue={form.description}
          isTextArea
          handleChange={handleChangeInputValue}
        />
        {/* WEBSITE URL */}
        <FormField
          inputStyles="create-edit-form-input"
          name="websiteUrl"
          optional
          type="text"
          inputLabel="Website URL"
          placeholder="https://example.com"
          formValue={form.websiteUrl}
          handleChange={handleChangeInputValue}
        />
      </div>
      {/* SUBMIT/EDIT BUTTON SECTION */}
      <Button
        styles="capitalize bg-purple-600 rounded-lg py-3 px-6 text-purple-50 font-medium"
        type="submit"
        title={
          isSubmitting
            ? `${type === "create" ? "Creating..." : "Editing..."}`
            : `${type === "create" ? "Create" : "Edit"}`
        }
      />
    </form>
  );
};

export default ProjectForm;
