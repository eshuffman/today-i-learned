using System;

namespace EmFacts.Utilities.HttpResponseExceptions
{
    public class HttpResponseExceptionValue
    {
        public HttpResponseExceptionValue()
        {
            Timestamp = DateTime.UtcNow;
        }
        public HttpResponseExceptionValue(int status, string error, string message)
        {
            Timestamp = DateTime.UtcNow;
            Status = status;
            Error = error;
            ErrorMessage = message;
        }
        public DateTime Timestamp { get; set; }
        public int Status { get; set; }
        public string Error { get; set; }
        public string ErrorMessage { get; set; }

    }
}
