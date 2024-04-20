import * as React from 'react'

interface VerifyEmailTemplateProps {
  username: string
  verifyCode: number
}

const VerifyEmailTemplate: React.FC<VerifyEmailTemplateProps> = ({ username, verifyCode }) => {
  return (
    <div>
      <h1>Hi, {username},</h1>
      <p>Thanks for signing up with us! Please verify your email address by entering the following code: </p>
      <h2>{verifyCode}</h2>
      <p>If you didnt sign up for an account, you can safely ignore this email.</p>
      <p>Thanks, Team ThaTruth</p>
    </div>
  )
}

export default VerifyEmailTemplate