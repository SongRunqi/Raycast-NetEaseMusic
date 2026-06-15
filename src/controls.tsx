import { Action, ActionPanel, List } from "@raycast/api";
import { ACTIONS, ActionId, runAction } from "./actions";
import { t } from "./localization";

const playbackActions: ActionId[] = ["play", "stop", "toggle-play", "next-track", "previous-track"];
const volumeActions: ActionId[] = ["turn-up-volume", "turn-down-volume"];
const favoriteActions: ActionId[] = ["like", "dislike"];
const otherActions: ActionId[] = ["toggle-lyrics", "customize-touch-bar"];

export default function Command() {
  return (
    <List searchBarPlaceholder={t({ en: "Search NetEase Music controls...", zh: "搜索网易云音乐控制..." })}>
      <List.Section title={t({ en: "Playback", zh: "播放" })}>
        {playbackActions.map((id) => (
          <ControlItem key={id} id={id} />
        ))}
      </List.Section>

      <List.Section title={t({ en: "Volume", zh: "音量" })}>
        {volumeActions.map((id) => (
          <ControlItem key={id} id={id} />
        ))}
      </List.Section>

      <List.Section title={t({ en: "Favorites", zh: "喜欢" })}>
        {favoriteActions.map((id) => (
          <ControlItem key={id} id={id} />
        ))}
      </List.Section>

      <List.Section title={t({ en: "Playback Mode", zh: "播放模式" })}>
        <List.Item
          title={t({ en: "Repeat", zh: "重复" })}
          subtitle={t({ en: "Choose Off, One, or All", zh: "选择关闭、单曲或全部" })}
          keywords={["repeat", "off", "one", "all", "重复", "单曲循环", "列表循环"]}
          actions={
            <ActionPanel>
              <ActionPanel.Submenu title={t({ en: "Set Repeat", zh: "设置重复" })}>
                <RunAction id="repeat-off" />
                <RunAction id="repeat-one" />
                <RunAction id="repeat-all" />
              </ActionPanel.Submenu>
              <RunAction id="repeat-off" />
              <RunAction id="repeat-one" />
              <RunAction id="repeat-all" />
            </ActionPanel>
          }
        />
        <ControlItem id="toggle-shuffle" />
      </List.Section>

      <List.Section title={t({ en: "Other", zh: "其他" })}>
        {otherActions.map((id) => (
          <ControlItem key={id} id={id} />
        ))}
      </List.Section>
    </List>
  );
}

interface ControlItemProps {
  id: ActionId;
}

function ControlItem({ id }: ControlItemProps) {
  const action = ACTIONS[id];

  return (
    <List.Item
      title={t(action.title)}
      subtitle={t(action.subtitle)}
      keywords={[action.title.en, action.title.zh, action.subtitle.en, action.subtitle.zh]}
      actions={
        <ActionPanel>
          <RunAction id={id} />
        </ActionPanel>
      }
    />
  );
}

interface RunActionProps {
  id: ActionId;
}

function RunAction({ id }: RunActionProps) {
  const action = ACTIONS[id];

  return (
    <Action
      title={t(action.title)}
      onAction={async () => {
        await runAction(id);
      }}
    />
  );
}
