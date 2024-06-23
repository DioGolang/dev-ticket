package domain

import "errors"

type TicketType string

var ErrTicketPriceZero = errors.New("ticket price must be greater tha")

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

func IsValidTicketType(ticketType TicketType) bool {
	return ticketType == TicketTypeHaf || ticketType == TicketTypeFull
}

func (t *Ticket) calculatePrice() {
	if t.TicketType == TicketTypeHaf {
		t.Price /= 2
	}
}

func (t *Ticket) Validate() error {
	if t.Price <= 0 {
		return ErrTicketPriceZero
	}
	return nil
}
