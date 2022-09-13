namespace EmFacts.Utilities
{
    public class ProviderResponse<T>
    {
        public ProviderResponse(T responseObject, ResponseTypes responseType, string message)
        {
            ResponseType = responseType;
            Message = message;
            ResponseObject = responseObject;
        }

        public T ResponseObject { get; }

        public ResponseTypes ResponseType { get; }

        public string Message { get; }
    }
}
