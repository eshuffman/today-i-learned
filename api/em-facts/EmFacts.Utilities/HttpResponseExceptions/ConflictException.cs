using System;

namespace EmFacts.Utilities.HttpResponseExceptions
{
    /// <summary>
    /// A custom exception for conflict errors.
    /// </summary>
    [Serializable]
    public class ConflictException : Exception, IHttpResponseException
    {
        public ConflictException(string message)
        {
            Value = new(status: 409, error: "Conflict", message: message);
        }
        public HttpResponseExceptionValue Value { get; set; }
    }
}
