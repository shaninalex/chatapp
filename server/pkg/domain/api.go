package domain

type StandartResponse struct {
	Messages []string `json:"messages"`
	Status   bool     `json:"status"`
	Data     any      `json:"data"`
}

// NewResponse create new response object
func NewResponse(data any, message []string, err error) *StandartResponse {
	status := true
	if err != nil {
		message = []string{err.Error()}
		status = false
	}
	return &StandartResponse{
		Messages: message,
		Status:   status,
		Data:     data,
	}
}
