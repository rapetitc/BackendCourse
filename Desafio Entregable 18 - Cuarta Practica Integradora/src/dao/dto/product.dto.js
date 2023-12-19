const productSchema = {
    title: async (value) => {
      if (typeof value !== "string") return "Invalid Data Type";
      if (value.length < 5) return "Lower Than 4 Characters";
      return true;
    },
    description: async (value) => {
      if (typeof value !== "string") return "Invalid Data Type";
      if (value.length < 10) return "Lower Than 10 Characters";
      return true;
    },
    code: async (value) => {
      if (typeof value !== "string") return "Invalid Data Type";
      if (value.length !== 12) return "Different Than 12 Characters";
      return true;
    },
    price: async (value) => {
      if (typeof value !== "number") return "Invalid Data Type";
      if (value.length > 0) return "Should be 0 or higher";
      return true;
    },
    status: async (value) => {
      if (typeof value !== "boolean") return "Invalid Data Type";
      return true;
    },
    stock: async (value) => {
      if (typeof value !== "number") return "Invalid Data Type";
      if (value.length > 0) return "Should be 0 or higher";
      return true;
    },
    category: async (value) => {
      if (typeof value !== "string") return "Invalid Data Type";
      if (value.length < 1) return "Should be 0 or higher";
      return true;
    },
    thumbnails: async (value) => {
      if (!Array.isArray(value)) return "Invalid Data Type";
      if (value.length < 1) return "Should be have 1 or more";
      return true;
    },
  };
  