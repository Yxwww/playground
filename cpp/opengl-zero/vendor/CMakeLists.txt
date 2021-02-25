#
# glad
#
add_library(glad STATIC glad/src/glad.c)
target_include_directories(glad PUBLIC glad/include)
target_link_libraries(glad PUBLIC dl)
target_compile_features(glad PUBLIC cxx_std_17)
set_target_properties(glad PROPERTIES CXX_EXTENSIONS OFF)
