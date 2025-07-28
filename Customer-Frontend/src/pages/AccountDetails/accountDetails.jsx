import { useState, useEffect } from "react";
import { User, Edit } from "lucide-react";
import NavBar from "../../components/NavBar/NavBar";
import "./accountDetails.css"

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [errors, setErrors] = useState({})
  const [isEmailEditable, setIsEmailEditable] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoadingData(true)
      const response = await fetch("http://localhost:3000/users/profile", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
         },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user data")
      }

      const userData = await response.json()
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
      })
    } catch (error) {
      console.error("Error fetching user data:", error)
      alert("Failed to load account details. Please refresh the page.")
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3000/users/update", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update user information")

      const result = await response.json()
      console.log("User updated successfully:", result)
      alert("Account details updated successfully!")
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Failed to update account details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleEmailEdit = () => setIsEmailEditable(!isEmailEditable)

  return (
    <div className="account-container">
      <NavBar />
      <div className="header">
        <User className="user-icon" />
        <h1 className="header-title">My Account</h1>
      </div>

      <div className="main-content">
        <h2 className="page-title">Account Details</h2>

        <div className="user-info-section">
          <h3 className="section-title">User Information</h3>

          {isLoadingData ? (
            <div className="loading-container">
              <p>Loading your account details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="user-form">
              {/* Email */}
              <div className="form-group">
                <div className="email-input-container">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEmailEditable}
                    className={`form-input email-input ${errors.email ? "error" : ""} ${
                      !isEmailEditable ? "disabled" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleEmailEdit}
                    className="edit-button"
                    title={isEmailEditable ? "Lock email" : "Edit email"}
                  >
                    <Edit className="edit-icon" />
                  </button>
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Username */}
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`form-input ${errors.username ? "error" : ""}`}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              {/* Submit */}
              <div className="button-container">
                <button type="submit" disabled={isLoading} className="submit-button">
                  {isLoading ? "Updating..." : "Update Details"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountDetails
