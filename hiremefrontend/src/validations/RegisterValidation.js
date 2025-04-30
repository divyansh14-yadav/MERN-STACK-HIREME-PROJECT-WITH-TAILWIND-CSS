import * as yup from "yup";

export const RegisterValidation = yup.object().shape({
    firstName: yup
        .string()
        .max(15, "First name should be max 15 characters")
        .required("First name is required"),
    lastName: yup
        .string()
        .max(15, "Last name should be max 15 characters")
        .required("Last name is required"),
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirm_password: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const RegisterProfileValidation = yup.object().shape({
    firstName: yup
        .string()
        .max(15, "Username should be max 15 characters")
        .required("Username is required"),
    country: yup
        .string()
        .max(20, "Country name too long")
        .required("Country is required"),
    mobile_number: yup
        .string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    address: yup
        .string()
        .min(6, "Address must be at least 6 characters")
        .required("Address is required"),
    state: yup
        .string()
        .required("State is required"),
    city: yup
        .string()
        .required("City is required"),
    zip_code: yup
        .string()
        .matches(/^\d{5,6}$/, "Zip Code must be 5 or 6 digits")
        .required("Zip Code is required"),

});


export const LoginValidation = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),

});

export const forgetPasswordValidation = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),

})

export const OtpValidation = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .matches(/^\d{4,6}$/, "OTP must be 4 to 6 digits"),
});


export const PasswordResetValidation = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    newPassword: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    confirm_password: yup
        .string()
        .required("Confirm password is required")
});


export const detailedServiceValidation = yup.object().shape({
    order_quotes: yup
        .string()
        .min(6, "order_quotes should be min 6 characters")
        .required("order_quotes is required"),
});


export const BasicInfoPortfolioValidation = yup.object().shape({
    folioTitle: yup
        .string()
        .min(3, "Portfolio title must be at least 3 characters")
        // .max(50, "Portfolio title should be maximum 50 characters")
        .required("Portfolio title is required"),

    description: yup
        .string()
        .min(10, "Description must be at least 10 characters")
        // .max(500, "Description should be maximum 500 characters")
        .required("Description is required"),

    portfolioImage: yup
        .string()
        .required("Portfolio image is required")
    // .matches(
    //   /\.(jpg|jpeg|png|gif|webp)$/i,
    //   "Image must be in jpg, jpeg, png, gif, or webp format"
    // ),
});

export const BasicInfoChangePasswordValidation = yup.object().shape({

    oldPassword: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    newPassword: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    confirm_password: yup
        .string()
        .required("Confirm password is required")
});

export const CreateTaskValidation = yup.object({
    taskTitle: yup
      .string()
      .required("Task title is required"),
  
    task_Skill_Required: yup
      .string()
      .required("Skill is required"),
  
    location: yup
      .string()
      .required("Location is required"),
  
    taskCategoryId: yup
      .string()
      .required("Task category is required"),
  
    Task_Min_Budget: yup
      .number()
      .typeError("Minimum budget must be a number")
      .required("Minimum budget is required"),
  
    Task_Max_Budget: yup
      .number()
      .typeError("Maximum budget must be a number")
      .moreThan(yup.ref('Task_Min_Budget'), "Max budget should be greater than min budget")
      .required("Maximum budget is required"),
  
    fixed_Task_type: yup
      .string()
      .required("Task type is required"),
  
    taskDescription: yup
      .string()
      .required("Task description is required"),
  
    task_logo: yup
      .string()
      .required("Task logo is required"),
  });
  
//   export const serviceCreateValidation = yup.object().shape({
//     title: yup.string().required("Title is required"),
//     description: yup.string().required("Description is required"),
//     categoryId: yup.string().required("Category is required"),
//     sub_categoryId: yup.string().required("Sub-category is required"),
//     searchTags: yup.string().required("Search tags are required"),
//     requirement: yup.string().required("Requirement is required"),
  
//     Basic_price: yup.array().of(
//       yup.object().shape({
//         b_Name: yup.string().required("Basic name is required"),
//         b_description: yup.string().required("Basic description is required"),
//         b_vector_file: yup.string().required("Vector file info is required"),
//         b_printable_file: yup.string().required("Printable file info is required"),
//         b_mockup: yup.string().required("Mockup info is required"),
//         b_source_file: yup.string().required("Source file info is required"),
//         b_social_media_kit: yup.string().required("Social media kit info is required"),
//         b_number_of_concept: yup
//           .number()
//           .typeError("Number of concepts must be a number")
//           .required("Number of concepts is required"),
//         b_revisions: yup
//           .number()
//           .typeError("Revisions must be a number")
//           .required("Revisions are required"),
//         b_price: yup
//           .number()
//           .typeError("Basic price must be a number")
//           .required("Basic price is required"),
//       })
//     ),
  
    // Standard_price: yup.array().of(
    //   yup.object().shape({
    //     s_Name: yup.string().required("Standard name is required"),
    //     s_description: yup.string().required("Standard description is required"),
    //     s_vector_file: yup.string().required("Vector file info is required"),
    //     s_printable_file: yup.string().required("Printable file info is required"),
    //     s_mockup: yup.string().required("Mockup info is required"),
    //     s_source_file: yup.string().required("Source file info is required"),
    //     s_social_media_kit: yup.string().required("Social media kit info is required"),
    //     s_number_of_concept: yup
    //       .number()
    //       .typeError("Number of concepts must be a number")
    //       .required("Number of concepts is required"),
    //     s_revisions: yup
    //       .number()
    //       .typeError("Revisions must be a number")
    //       .required("Revisions are required"),
    //     s_price: yup
    //       .number()
    //       .typeError("Standard price must be a number")
    //       .required("Standard price is required"),
    //   })
    // ),
  
    // Premium_price: yup.array().of(
    //   yup.object().shape({
    //     p_Name: yup.string().required("Premium name is required"),
    //     p_description: yup.string().required("Premium description is required"),
    //     p_vector_file: yup.string().required("Vector file info is required"),
    //     p_printable_file: yup.string().required("Printable file info is required"),
    //     p_mockup: yup.string().required("Mockup info is required"),
    //     p_source_file: yup.string().required("Source file info is required"),
    //     p_social_media_kit: yup.string().required("Social media kit info is required"),
    //     p_number_of_concept: yup
    //       .number()
    //       .typeError("Number of concepts must be a number")
    //       .required("Number of concepts is required"),
    //     p_revisions: yup
    //       .number()
    //       .typeError("Revisions must be a number")
    //       .required("Revisions are required"),
    //     p_price: yup
    //       .number()
    //       .typeError("Premium price must be a number")
    //       .required("Premium price is required"),
    //   })
    // ),
  
//     FAQ: yup.array().of(
//       yup.object().shape({
//         question: yup.string().required("Question is required"),
//         answer: yup.string().required("Answer is required"),
//       })
//     ),
  
//     images: yup.array().of(
//       yup.object().shape({
//         file: yup
//           .mixed()
//           .required("Image is required")
//         //   .test("fileSize", "File size should be under 5MB", (file) => {
//         //     return file && file.size <= 5 * 1024 * 1024;
//         //   }),
//       })
//     ),
//   });


  // Step 1: Basic Details
export const step1Validation = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    categoryId: yup.string().required("Category is required"),
    sub_categoryId: yup.string().required("Sub-category is required"),
    searchTags: yup.string().required("Search tags are required"),
  });
  
  // Step 2: Pricing
  export const step2Validation = yup.object().shape({
    Basic_price: yup.array().of(
      yup.object().shape({
        b_Name: yup.string().required("Basic name is required"),
        b_description: yup.string().required("Basic description is required"),
        b_price: yup
          .number()
          .typeError("Basic price must be a number")
          .required("Basic price is required"),
        b_revisions: yup
          .number()
          .typeError("Revisions must be a number")
          .required("Revisions are required"),
        b_number_of_concept: yup
          .number()
          .typeError("Number of concepts must be a number")
          .required("Concepts required"),
      })
    ),
    Standard_price: yup.array().of(
        yup.object().shape({
          s_Name: yup.string().required("Standard name is required"),
          s_description: yup.string().required("Standard description is required"),
          s_vector_file: yup.string().required("Vector file info is required"),
          s_printable_file: yup.string().required("Printable file info is required"),
          s_mockup: yup.string().required("Mockup info is required"),
          s_source_file: yup.string().required("Source file info is required"),
          s_social_media_kit: yup.string().required("Social media kit info is required"),
          s_number_of_concept: yup
            .number()
            .typeError("Number of concepts must be a number")
            .required("Number of concepts is required"),
          s_revisions: yup
            .number()
            .typeError("Revisions must be a number")
            .required("Revisions are required"),
          s_price: yup
            .number()
            .typeError("Standard price must be a number")
            .required("Standard price is required"),
        })
      ),
    
      Premium_price: yup.array().of(
        yup.object().shape({
          p_Name: yup.string().required("Premium name is required"),
          p_description: yup.string().required("Premium description is required"),
          p_vector_file: yup.string().required("Vector file info is required"),
          p_printable_file: yup.string().required("Printable file info is required"),
          p_mockup: yup.string().required("Mockup info is required"),
          p_source_file: yup.string().required("Source file info is required"),
          p_social_media_kit: yup.string().required("Social media kit info is required"),
          p_number_of_concept: yup
            .number()
            .typeError("Number of concepts must be a number")
            .required("Number of concepts is required"),
          p_revisions: yup
            .number()
            .typeError("Revisions must be a number")
            .required("Revisions are required"),
          p_price: yup
            .number()
            .typeError("Premium price must be a number")
            .required("Premium price is required"),
        })
      ),
  });
  
  // Step 3: FAQ
  export const step4Validation = yup.object().shape({
    FAQ: yup.array().of(
      yup.object().shape({
        question: yup.string().required("Question is required"),
        answer: yup.string().required("Answer is required"),
      })
    ),
  });
  
  // Step 4: Requirements
  export const step3Validation = yup.object().shape({
    requirement: yup.string().required("Requirement is required"),
  });
  
  // Step 5: Images
  export const step5Validation = yup.object().shape({
    images: yup
      .array()
      .min(1, "At least one image is required")
      .of(
        yup.object().shape({
          file: yup
            .mixed()
            .required("Image is required")
            .test("fileSize", "File too large", (file) => file && file.size <= 5 * 1024 * 1024),
        })
      ),
  });
  