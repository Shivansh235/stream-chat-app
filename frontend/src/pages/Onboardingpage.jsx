import useAuthUser from "../hooks/useAuthUser";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CameraIcon, ShuffleIcon,MapPinIcon, ShipWheelIcon,LoaderIcon } from "lucide-react";
import { completeOnboarding } from "../lib/api";
import { LANGUAGES } from "../constants";

const Onboardingpage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error)=>{
      toast.error(error)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handlechangeAvatar = () => {
     const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

     setFormState({...formState, profilePic:randomAvatar});
     toast.success("random avatar generated successfully")
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>
          {/* profile pic contain */}
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Image preview */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src="{formState.profilePic}"
                    alt="profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* generate random avatar btn */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlechangeAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* Full Name */}

            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                className="input input-boarded w-full"
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                placeholder="Your full Name"
              />
            </div>

            {/* BIO */}

            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about youself whatever your learning and goals"
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native languages */}
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text">Native Language</span>
                </label>

                <select
                  name="nativeLanguage"
                  id=""
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native Language</option>

                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* learning languages */}

              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text">Learning Language</span>
                </label>

                <select
                  name="learningLanguage"
                  id=""
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your learning Language</option>

                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* location */}

            <div className="form-control">
              <label htmlFor="" className="label-btn">
                <span className="label-text">Location</span>
              </label>
              <div className="relative top-2">
                <MapPinIcon className="absolute top-[14px] transform-translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City,Country"
                />
              </div>
            </div>

            {/* Submit btn */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
               {isPending ? (

                <>
                 <ShipWheelIcon  className="size-5 mr-2"/>
                 Complete Onboarding
                </>
               ):(

                <>
                <LoaderIcon className="animate-spin size-5 mr-2"/>
                   Onboarding...
                
                
                </>
               )
               
              
              }


            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboardingpage;
