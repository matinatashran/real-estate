const VerifyComponent = (email: string, OTPCode: string) => {
  return `
    <div>
      <h3>
        Password recovery for
        <span>${email}</span>
      </h3>
      <p>
        You can change your password by entering this password in the specified
        field. If you received this email unsolicited, you do not need to take
        any action. Just close this email.
      </p>
      <p>Password Recovery</p>
      <h2>${OTPCode}</h2>
    </div>`;
};

export default VerifyComponent;
