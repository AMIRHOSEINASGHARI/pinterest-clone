// React Imports
import { useEffect, useState } from "react";
// Next Imports
import Image from "next/image";
import { useRouter } from "next/router";
// Next-Auth Imports
import { useSession } from "next-auth/react";
// Components Imports
import { Button, FormField, Loader, MasonryLayout } from "@/components";
// React Icons Imports
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaLongArrowAltLeft } from "react-icons/fa";
// Utility Functions Imports
import { updateUserProfile } from "@/utils/api";

const User = (props) => {
  const session = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({});

  const [userDescription, setUserDescription] = useState("");
  const [activateTyping, setActivateTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${props?.userId}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchUser();
  }, [props?.userId]);

  const changeHandler = (e) => {
    setUserDescription(e.target.value);
  };

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    if (userDescription.length >= 30) {
      setIsSubmitting(true);
      const result = await updateUserProfile(
        userData?.data?.user?._id,
        userDescription,
        session
      );
      setIsSubmitting(false);
      if (result?.status === "success") window.location.reload();
    }
  };

  const goHome = (e) => {
    e.stopPropagation();
    router.push("/");
  };

  if (!userData)
    return (
      <Loader h="120" w="120" color="#6b7280" text="Loading user profile" />
    );

  if (userData?.status === "failed") return <h1>{userData?.data?.message}</h1>;

  if (userData?.status === "success") {
    const { avatarUrl, description, email, name, projects, _id } =
      userData?.data?.user;

    return (
      <div>
        <Button
          handleButton={goHome}
          styles="bg-gray-300 h-12 w-12 text-black shadow-lg flex items-center justify-center rounded-full fixed z-10 top-24 left-3 lg:left-8"
          title={<FaLongArrowAltLeft />}
        />
        <div className="flex flex-col items-center mb-10 lg:mb-36 p-3">
          {/* //   AVATAR SECTION    //*/}
          <a href={avatarUrl} download target="_blank">
            <Image
              src={avatarUrl}
              alt={name}
              width={150}
              height={150}
              className="rounded-full"
            />
          </a>
          <div className="w-full">
            {/* //   NAME AND EMAIL SECTION    //*/}
            <div className="my-3">
              <h1 className="uppercase tracking-tight text-center font-bold text-lg md:text-2xl lg:text-4xl">
                {name}
              </h1>
              <h3 className="tracking-tight capitalize text-gray-400 text-center">
                {email.split("@")[0]}
              </h3>
            </div>
            {/* //   DESCRIPTION SECTION    //*/}
            <div className="w-full">
              {description && (
                <div className="w-full flex justify-center">
                  <p className="text-center sm:max-w-[80%] md:max-w-2/3 p-3">
                    {description}
                  </p>
                </div>
              )}
              {!description && session?.data?.id === _id && (
                <form
                  onSubmit={handleUpdateUserProfile}
                  className="flex flex-col items-center gap-2"
                >
                  <Button
                    title={
                      <>
                        <span>Tell us more about yourself</span>
                        {activateTyping ? <BsChevronUp /> : <BsChevronDown />}
                      </>
                    }
                    type="button"
                    styles="text-center font-bold flex items-center gap-3 bg-gray-100 rounded-full py-1.5 px-4"
                    handleButton={() => setActivateTyping(!activateTyping)}
                  />
                  {activateTyping && (
                    <div>
                      <FormField
                        inputStyles="profile-des-input"
                        placeholder="Up to 30 Characters..."
                        formValue={userDescription}
                        handleChange={changeHandler}
                        type="text"
                        isTextArea
                      />
                    </div>
                  )}
                  {activateTyping && userDescription.length >= 30 && (
                    <Button
                      type="submit"
                      title={isSubmitting ? "Saving..." : "Save"}
                      styles="rounded-full py-1.5 px-4 bg-black text-white tracking-tight font-semibold text-sm mt-2"
                    />
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
        {/* //   USER PROJECTS SECTION    //*/}
        <div>
          <div className="flex justify-center">
            <h1 className="text-center py-2 mb-3 relative border-b-4 font-medium border-black w-fit">
              Created
              <span className="absolute -top-2 -right-5 bg-purple-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                {projects?.length}
              </span>
            </h1>
          </div>
          {projects?.length ? (
            <MasonryLayout projects={projects} isProfile />
          ) : (
            <div className="flex justify-center">
              <h1>No Posts</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default User;

export async function getServerSideProps(req) {
  return {
    props: { userId: req.query.userId },
  };
}
