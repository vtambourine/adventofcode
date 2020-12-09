package day05

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
	"github.com/vtambourine/adventofcode/2020/util"
	"sort"
)

func HighestSeat(c *challenge.Challenge) int {
	max := 0
	for line := range c.Lines() {
		pass := parsePass(line)
		max = util.MaxInt(max, pass.id)
	}
	return max
}

func MissingSeat(c *challenge.Challenge) int {
	ids := make([]int, 0)
	for line := range c.Lines() {
		pass := parsePass(line)
		ids = append(ids, pass.id)
	}
	sort.Ints(ids)
	lowest := ids[0]
	for i, id := range ids {
		if id != lowest+i {
			return id - 1
		}
	}
	panic("no solution")
}

func Register(s command.Solutions) {
	s.Register(5, "a", HighestSeat)
	s.Register(5, "b", MissingSeat)
}
