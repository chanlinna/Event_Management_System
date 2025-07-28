"use client"

import { useState, useEffect } from "react"
import { User, Edit } from "lucide-react"
import "./accountDetails.css"

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true) // Add this for initial data loading
  const [errors, setErrors] = useState({})
  const [isEmailEditable, setIsEmailEditable] = useState(false)

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoadingData(true)

      // Backend integration point - fetch current user data
      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header
          // 'Authorization': `Bearer ${token}`
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user data")
      }

      const userData = await response.json()

      // Pre-populate form with existing user data
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[\d\s\-$$$$]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Backend integration point - replace with your API endpoint
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update user information")
      }

      const result = await response.json()
      console.log("User updated successfully:", result)

      // Handle success (show notification, redirect, etc.)
      alert("Account details updated successfully!")
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Failed to update account details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleEmailEdit = () => {
    setIsEmailEditable(!isEmailEditable)
  }

  return (
    <div className="account-container">
      {/* Header */}
      <div className="header">
        <User className="user-icon" />
        <h1 className="header-title">My Account</h1>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Account Details Title */}
        <h2 className="page-title">Account Details</h2>

        {/* User Information Section */}
        <div className="user-info-section">
          <h3 className="section-title">User Information</h3>

          {isLoadingData ? (
            <div className="loading-container">
              <p>Loading your account details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="user-form">
              {/* Rest of the form remains the same */}
              {/* Name Field */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? "error" : ""}`}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <div className="email-input-container">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEmailEditable}
                    className={`form-input email-input ${errors.email ? "error" : ""} ${!isEmailEditable ? "disabled" : ""}`}
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

              {/* Phone Number Field */}
              <div className="form-group">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phoneNumber ? "error" : ""}`}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>

              {/* Submit Button */}
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
