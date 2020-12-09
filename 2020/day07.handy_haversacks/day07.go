package day07

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

const targetBag = "shiny gold"

func nestedBags(c *challenge.Challenge) int {
	result := parseBaggageRules(c)

	count := 0
	for b := range result {
		if result.canContain(b, targetBag) {
			count++
		}
	}

	return count
}

func totalBags(c *challenge.Challenge) int {
	return parseBaggageRules(c).cost(targetBag) - 1
}

func Register(s command.Solutions) {
	s.Register(7, "a", nestedBags)
	s.Register(7, "b", totalBags)
}
