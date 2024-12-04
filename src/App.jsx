import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    // aur idhr pr bhi
    selectedProject: undefined, // Idahr pr mere project me alag hai
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId = Math.random();

      const newTask = {
        text: text,
        projectId: prevState.selectedProject,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState((prevState) => {
      return {
        ...prevState,
       
        tasks: prevState.tasks.filter(
          (tasks) => tasks.id !== id
        ),
      };
    });

  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProject
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();

      const newProject = {
        ...projectData,
        selectedProjectId: undefined,
        id: projectId,
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProject
  );

  let content = (
    <SelectedProject project={selectedProject} 
                      onDelete={handleDeleteProject} 
                      onAddTask={handleAddTask}
                      onDeleteTask={handleDeleteTask}
                      tasks={projectState.tasks}/>
  );

  if (projectState.selectedProject === null) {
    content = <NewProject onAdd={handleAddProject} onDelete={handleDeleteProject}/>;
  } else if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
