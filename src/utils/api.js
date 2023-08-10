export const getProjectDetails = async (projectId) => {
  const res = await fetch(`/api/project/${projectId}`);
  const data = await res.json();
  return data;
}; // $$ FETCH PROJECT API

export const createProject = async (form) => {
  const res = await fetch("/api/project/create", {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}; // $$ CREATE PROJECT API

export const editProject = async (projectId, form) => {
  const res = await fetch(`/api/project/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify({ newForm: form, actionType: "editProject" }),
    headers: { "Content-Type": "applicaiton/json" },
  });
  const data = await res.json();
  return data;
}; // $$ EDIT PROJECT API

export const sendComment = async (projectId, text) => {
  const res = await fetch(`/api/project/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify({ text, actionType: "sendingComment" }),
    headers: { "Content-Type": "applicaiton/json" },
  });
  const data = await res.json();
  return data;
}; // $$ SEND COMMENT API

export const deleteProject = async (projectId) => {
  const res = await fetch(`/api/project/${projectId}`, {
    method: "DELETE",
    headers: { "Content-Type": "applicaiton/json" },
  });
  const data = await res.json();
  return data;
}; // $$ DELETE PROJECT API

export const updateUserProfile = async (userId, userDescription, session) => {
  const res = await fetch(`/api/user/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      description: userDescription,
      authorizedUserId: session?.data?.id,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}; // $$ UPDATE USER PROFILE API
