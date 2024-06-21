package domain

type TicketType string

const (
	TicketTypeHaf  TicketType = "half"
	TicketTypeFull TicketType = "full"
)

type Ticket struct {
	ID         string
	EventID    string
	Name       string
	Status     SpotStatus
	TicketType TicketType
	Price      float64
}
