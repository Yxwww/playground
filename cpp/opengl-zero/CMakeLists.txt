cmake_minimum_required(VERSION 3.12...3.16)
project(lovegl
    VERSION 1.0
    DESCRIPTION "do you love"
    LANGUAGES C CXX)
find_package(GLFW3 REQUIRED)
find_package(OpenGL REQUIRED)
add_subdirectory(vendor)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(LEARN_OPENGL_SRC_FILES
    src/main.cpp
)
add_executable(lovegl ${LEARN_OPENGL_SRC_FILES})

target_compile_features(lovegl PUBLIC cxx_std_17)
set_target_properties(lovegl PROPERTIES
    CXX_EXTENSIONS OFF
)
target_link_libraries(lovegl PUBLIC glfw glad)
